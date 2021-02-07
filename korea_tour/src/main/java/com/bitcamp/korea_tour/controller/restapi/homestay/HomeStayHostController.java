package com.bitcamp.korea_tour.controller.restapi.homestay;

import java.io.File;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bitcamp.korea_tour.fileupload.SpringFileWriter;
import com.bitcamp.korea_tour.model.homestay.HomeStayPhotoDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayReservationDto;
import com.bitcamp.korea_tour.model.homestay.JoinHomeStayDetailDto;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayHostPhotoService;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayHostService;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayReservationService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class HomeStayHostController {
	private final HomeStayHostService hsas;
	private final HomeStayHostPhotoService hshps;
	private final HomeStayReservationService hsrs;
	@Autowired
	private JavaMailSender mailSender;

	
	/**
	 * 예약 승인,거절(호스트용)
	 * @param homeStayReservationNum
	 * @param approval
	 */
	@PatchMapping("/homestays/reservation/{homeStayReservationNum}/{approval}")
	public void ApprovalReservation(
			@PathVariable(value="homeStayReservationNum")int homeStayReservationNum,
			@PathVariable(value="approval") int approval) {
		hsas.updateApproval(homeStayReservationNum,approval);
		HomeStayReservationDto dto = hsrs.getData(homeStayReservationNum);
		String name= dto.getName();
		String email1 = dto.getEmail1();
		String email2 = dto.getEmail2();
		
		MimeMessage message=mailSender.createMimeMessage();

		
		try {
			//메일제목
			if(approval==1) {
			message.setSubject(name+"님의 예약이 완료되었습니다.");
			message.setText("승인 승인 승인");
			message.setRecipients(MimeMessage.RecipientType.TO,
					InternetAddress.parse(email1+"@"+email2));
			}
			if(approval==2) {
			message.setSubject(name+"님의 예약신청이 거절 되었습니다.");			
			//메일 본문
			message.setText("거절 거절 거절");
			//받을 메일 주소
			message.setRecipients(MimeMessage.RecipientType.TO,
					InternetAddress.parse(email1+"@"+email2));
			//메일전송
			}
			mailSender.send(message);
			//포워드파일로 메세지 보내기
		} catch (MessagingException e) 	{
		
		}
	
	}
	
	
	
	
	
	/**
	 * 호스트 집정보 수정
	 * @param userNum
	 * @param dto
	 */
	@PutMapping("/homestays/house/{userNum}")
	public void updateHouse(
			@PathVariable(value = "userNum") int userNum,
			@RequestBody JoinHomeStayDetailDto dto) {
		int homeStayNum = hsas.getHomeStayNum2(userNum);

		hsas.updateHomeStay(dto, homeStayNum);
		hsas.updateHomeStayDetail(dto, homeStayNum);
	}
	
	
	
	/**
	 * userNum으로 집정보 얻기(수정폼에서 사용)
	 * @param userNum
	 * @return
	 */
	@GetMapping("/homestays/house/{userNum}")
	public JsonData getHomeStayData(@PathVariable(value = "userNum")int userNum) {
		JoinHomeStayDetailDto dto = hsas.getHomeStayData(userNum);
		JoinHomeStayDetailDto ddto = hsas.getHomeStayDetailData(userNum);
		int homeStayNum = dto.getHomeStayNum();
		/* int userNum = dto.getUserNum(); */
		String title = dto.getTitle();
		String addr1 = dto.getAddr1();
		String addr2 = dto.getAddr2();
		String content = dto.getContent();
		int approval = dto.getApproval();
		String checkIn1 = dto.getCheckIn1();
		String checkIn2 = dto.getCheckIn2();
		String checkOut1 = dto.getCheckOut1();
		String checkOut2 = dto.getCheckOut2();
		String xpos = dto.getXpos();
		String ypos = dto.getYpos();
		int price = dto.getPrice();
		int open = dto.getOpen();


		int dogOk = dto.getDogOk();
		int smokingOk = dto.getSmokingOk();
		int maxPeople = dto.getMaxPeople();
		String email1 = dto.getEmail1();
		String email2 = dto.getEmail2();
		String hp = dto.getHp();
		int wifi = dto.getWifi();
		int towel = dto.getTowel();
		int breakfast = dto.getBreakfast();
		int aircon = dto.getAircon();
		int elecProduct = dto.getElecProduct();
		int kitchen = dto.getKitchen();
		int bathroom = dto.getBathroom();
		int parking = dto.getParking();
		return new JsonData(homeStayNum,parking, title,addr1,addr2,content,parking, checkIn1
				,checkIn2,checkOut1,checkOut2,xpos,ypos,price,open,dogOk,smokingOk,
				maxPeople,parking, email1,email2,hp,wifi,towel,breakfast,aircon,elecProduct,kitchen,bathroom,parking);
	}

	
	
	/**
	 * 호스트 집 사진 올리기
	 * @param userNum
	 * @param images
	 * @param request
	 */
	@PostMapping("/homestays/photo/{userNum}")
	public void insertPhoto(
			@PathVariable(value = "userNum") int userNum,
			/* @RequestParam int homeStayNum, */
			@RequestParam List<MultipartFile> images,
			HttpServletRequest request
			) {
		String path = request.getSession().getServletContext().getRealPath("/homeStayImg");
		SpringFileWriter writer = new SpringFileWriter(); 
		String upload = "";
		for(MultipartFile file: images) {
			if(file.getOriginalFilename().length() == 0) {
				upload = "no";
				break;			
			}

			upload = writer.changeFilename(file.getOriginalFilename());
			writer.writeFile(file, upload, path);

			int homeStayNum = hsas.getHomeStayNum2(userNum);
			HomeStayPhotoDto dto = new HomeStayPhotoDto();
			dto.setPhotoName(upload);
			dto.setUserNum(userNum);
			dto.setHomeStayNum(homeStayNum);
			hshps.insertPhoto(dto);
		}
	}
	

	/**
	 * 호스트 집 사진 삭제하기
	 * @param homeStayPhotoNum
	 * @param request
	 */
	@DeleteMapping("/homestays/photo/{homeStayPhotoNum}")
	public void deleteData(@PathVariable(name="homeStayPhotoNum") int homeStayPhotoNum
			,HttpServletRequest request) {
		String path = request.getSession().getServletContext().getRealPath("/homeStayImg");
		String deleteFile = hshps.getData(homeStayPhotoNum).getPhotoName();
		if(!deleteFile.equals("no")) {
			File file = new File(path +"/"+ deleteFile);
			if(file.exists()) {
				file.delete();
			}
		}
		// db데이터 삭제
		hshps.deletePhoto(homeStayPhotoNum);
	}
	
	
	/**
	 * 호스트 집 사진정보 얻기
	 * @param userNum
	 * @param request
	 */
	
	@GetMapping("/homestays/photo/{userNum}")
	public JsonName<List<HomeStayPhotoDto>> getPhotoName(@PathVariable(name="userNum")int userNum
			,HttpServletRequest request) {
		System.out.println(userNum);
		List<HomeStayPhotoDto> list = hshps.getData2(userNum);		
		System.out.println(list);
		return new JsonName<List<HomeStayPhotoDto>>(list);
	}

	@Data
	@AllArgsConstructor
	static class JsonData{
		private int homeStayNum;
		private int userNum;
		private String title;
		private String addr1;
		private String addr2;
		private String content;
		private int approval;
		private String checkIn1;
		private String checkIn2;
		private String checkOut1;
		private String checkOut2;
		private String xpos;
		private String ypos;
		private int price;
		private int open;

		private int homeStayDetailNum;
		private int dogOk;
		private int smokingOk;
		private int maxPeople;
		private String email1;
		private String email2;
		private String hp;
		private int wifi;
		private int towel;
		private int breakfast;
		private int aircon;
		private int elecProduct;
		private int kitchen;
		private int bathroom;
		private int parking;
	}
	@Data
	@AllArgsConstructor
	static class JsonName<T>{
		private T list;
	}


}
