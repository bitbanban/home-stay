package com.bitcamp.korea_tour.controller.restapi.homestay;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.sql.Date;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RequestMapping;
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
//import com.bitcamp.korea_tour.model.service.s3.S3Service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class HomeStayHostController {
	private final HomeStayHostService hsas;
	private final HomeStayHostPhotoService hshps;
	private final HomeStayReservationService hsrs;
//	private final S3Service s3Service;
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
		

		MimeMessage message=mailSender.createMimeMessage();


		try {
			String name= dto.getName();
			String email1 = dto.getEmail1();
			String email2 = dto.getEmail2();
			Date checkInDay = dto.getCheckInDay();
			Date checkOutDay = dto.getCheckOutDay();
			int numberOfPeople = dto.getNumberOfPeople();
			int totalPrice = dto.getTotalPrice();
			Date writeDay = dto.getWriteday();

			SimpleDateFormat sdf = new SimpleDateFormat("yyyy년 MM월 dd일");
			String cid = sdf.format(checkInDay);
			String cod = sdf.format(checkOutDay);
			String wd = sdf.format(writeDay);

			DecimalFormat dcf = new DecimalFormat("###,###,###,###");
			String price = dcf.format(totalPrice);

			int homeStayNum = dto.getHomeStayNum();
			int userNum = hsas.getUserNum(homeStayNum);
			JoinHomeStayDetailDto ddto = hsas.getHomeStayAllData(userNum);
			String hEmail1 = ddto.getEmail1();
			String hEmail2 = ddto.getEmail2();
			String hp = ddto.getHp();
			String hp1 = hp.substring(0,3);
			String hp2 = hp.substring(3,7);
			String hp3 = hp.substring(7,11);
			String addr1 = ddto.getAddr1();
			String addr2 = ddto.getAddr2();
			String checkIn1 = ddto.getCheckIn1();
			String checkIn2 = ddto.getCheckIn2();
			String checkOut1 = ddto.getCheckOut1();
			String checkOut2 = ddto.getCheckOut2();
			
			String ci = (checkIn2.equals("0"))?"00":checkIn2;
			String co = (checkOut2.equals("0"))?"00":checkOut2;
			//메일제목
			if(approval==2) {
				message.setSubject(name+"님의 예약이 완료되었습니다.");

				message.setText("아래의 예약 내용을 확인해 주세요" +"\n"+"\n"
						+"예약자 명 : "+name+"\n"
						+"체크인 날짜 : "+cid+"\n"
						+"체크아웃 날짜 : "+cod+"\n"
						+ "예약 인원 : "+numberOfPeople+"명"+"\n"
						+"총 금액 : "+price+"원"+"\n"
						+"예약 날짜 : "+wd+"\n"
						+"주소 : " + addr1+" "+addr2+"\n"
						+"체크인 시간 : " + checkIn1+"시"+" "+ci+"분"+"\n"
						+"체크아웃 시간 : " + checkOut1+"시"+" "+co+"분"+"\n"+"\n"
						
						+" 자세한 문의는 아래의 연락처로 주시길 바랍니다."+"\n" +"\n"
						+"호스트 연락처" +"\n"
						+"Email : "+hEmail1+"@"+hEmail2+"\n"
						+"Hp : "+hp1+"-"+hp2+"-"+hp3);
				message.setRecipients(MimeMessage.RecipientType.TO,
						InternetAddress.parse(email1+"@"+email2));
			}
			if(approval==1) {
				message.setSubject(name+"님의 예약 신청이 거절되었습니다.");			
				//메일 본문
				message.setText("호스트의 개인 사정으로 예약신청이 거절 되었습니다. 죄송합니다.");
				//받을 메일 주소
				message.setRecipients(MimeMessage.RecipientType.TO,
						InternetAddress.parse(email1+"@"+email2));
				//메일전송
			}
			mailSender.send(message);
			//포워드파일로 메세지 보내기
		} catch (MessagingException e) 	{
			System.out.println("알수없는 오류로 인한 메일 전송 실패");
		} catch (StringIndexOutOfBoundsException e) {
			System.out.println("메일전송 실패. 호스트나 회원 정보에 잘못입력된값 있음(호스트 핸드폰 번호 11자리 인지 확인)");
		} catch (NullPointerException e) {
			System.out.println("메일전송 실패. 호스트나 회원 정보에 비어있는곳 있음");
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
	 * 홈스테이 오픈여부 수정
	 * @param userNum
	 * @param map
	 */
	@PatchMapping("/homestays/house/{userNum}")
	public void updateHouseOpen(@PathVariable(value = "userNum") int userNum,
			@RequestBody Map<String, Object> map) {
		int open=Integer.parseInt(map.get("open").toString());
		hsas.updateHomeStayOpen(userNum, open);
	}
			
	


	/**
	 * userNum으로 집정보 얻기(수정폼에서 사용)
	 * @param userNum
	 * @return
	 */
	@GetMapping("/homestays/house/{userNum}")
	public JsonData getHomeStayData(@PathVariable(value = "userNum")int userNum) {
		JoinHomeStayDetailDto dto = hsas.getHomeStayAllData(userNum);
		
		return new JsonData(dto);
		
	}
	
	
	


	/**
	 * 호스트 집 사진 올리기
	 * @param userNum
	 * @param images
	 * @param request
	 * @throws IOException 
	 */
	@PostMapping("/homestays/photo/{userNum}")
	public void insertPhoto(
			@PathVariable(value = "userNum") int userNum,
			/* @RequestParam int homeStayNum, */
			@RequestParam List<MultipartFile> images,
			HttpServletRequest request
			) throws IOException {
				/*
				 * String path =
				 * request.getSession().getServletContext().getRealPath("/homeStayImg");
				 * SpringFileWriter writer = new SpringFileWriter(); String upload = "";
				 * for(MultipartFile file: images) { if(file.getOriginalFilename().length() ==
				 * 0) { upload = "no"; break; }
				 * 
				 * upload = writer.changeFilename(file.getOriginalFilename());
				 * writer.writeFile(file, upload, path);
				 */
		
		
		String basePath = "homeStayImg";
		for(MultipartFile file: images) {
			String filePath = "";
			if(file.isEmpty()) {
				break;
			}else {
				String fileName = file.getOriginalFilename();
				Calendar cal = Calendar.getInstance();
				String day = cal.get(Calendar.HOUR) +""+ cal.get(Calendar.MINUTE)+""+cal.get(Calendar.SECOND);
				String changeFilename ="home" +day+ "_" + fileName;
//				filePath = URLDecoder.decode(s3Service.upload(file, basePath, changeFilename),"UTF-8");
				System.out.println(changeFilename);
				System.out.println(filePath);
			}
			
			int homeStayNum = hsas.getHomeStayNum2(userNum);
			HomeStayPhotoDto dto = new HomeStayPhotoDto();
			dto.setPhotoName(filePath);
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
		String deleteFile = hshps.getData(homeStayPhotoNum).getPhotoName();
		int num = deleteFile.indexOf("com");
		if(num != -1) {
			num+=4;
			String changeDeleteFile = deleteFile.substring(num);
			System.out.println(changeDeleteFile);
//			s3Service.delete(changeDeleteFile);
			hshps.deletePhoto(homeStayPhotoNum);
		}else {
			System.out.println("삭제실패!!");
		}
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
			private JoinHomeStayDetailDto dto;
	}
	@Data
	@AllArgsConstructor
	static class JsonName<T>{
		private T list;
	}


}
