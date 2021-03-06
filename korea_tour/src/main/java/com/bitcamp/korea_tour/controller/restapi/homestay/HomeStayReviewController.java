package com.bitcamp.korea_tour.controller.restapi.homestay;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bitcamp.korea_tour.fileupload.SpringFileWriter;
import com.bitcamp.korea_tour.model.PlacePhotoDto;
import com.bitcamp.korea_tour.model.UserDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayReviewDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayReviewPhotoDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayStarDto;
import com.bitcamp.korea_tour.model.homestay.JoinHomeStayReviewDto;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayReservationService;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayReviewPhotoService;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayReviewService;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayStarService;
import com.bitcamp.korea_tour.model.service.login.setting.SessionNames;
import com.bitcamp.korea_tour.model.service.s3.S3Service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class HomeStayReviewController implements SessionNames{
	private final HomeStayReviewService s;
	private final HomeStayStarService ss;
	private final HomeStayReservationService rs;
	private final HomeStayReviewPhotoService ps;
	private final S3Service s3Service;

	//해당 집의 댓글 출력
	@GetMapping("/homestays/{homeStayNum}/allreview")
	   public JsonAllReviews<List<HomeStayReviewDto>>getAllReview(@PathVariable(value = "homeStayNum")int homeStayNum){
	      List<HomeStayReviewDto> reviews = s.getAllReview(homeStayNum);
	      for(HomeStayReviewDto dto:reviews) {
	         dto.setDap(s.ifReply(dto.getHomeStayNum(), dto.getRegroup()));
	      }
	      return new JsonAllReviews<List<HomeStayReviewDto>>(reviews);
	   }

	//해당 집의 댓글에 해당하는 사진 출력
	@GetMapping("/homestays/{homeStayNum}/allreview/{homeStayReviewNum}")
	public JsonReviewPhoto<List<HomeStayReviewPhotoDto>>getReviewPhoto(@PathVariable(value = "homeStayNum")int homeStayNum,
			@PathVariable(value = "homeStayReviewNum")int homeStayReviewNum){
		List<HomeStayReviewPhotoDto> photos = s.getAllReviewPhoto(homeStayReviewNum);
		return new JsonReviewPhoto<List<HomeStayReviewPhotoDto>>(photos);
	}

	//해당 집에 댓글 입력하기
	@PostMapping("/homestays/{homeStayNum}/insertreview")
	public void insertReview(@PathVariable(value="homeStayNum") int homeStayNum,
			HttpServletRequest request, @ModelAttribute HomeStayReviewDto dto) {
		HttpSession session=request.getSession();
		UserDto user=(UserDto)session.getAttribute(USER);

		int loginNum = user.getUserNum(); 
		String loginId = user.getName(); 
		String loginPhoto = user.getPhoto();


		//regroup max 값
		int max = s.maxOfRegroup();
		//userNum,homeStayNum,relevel,regroup,loginNum,loginId,loginPhoto,content,writeday,deleted

		dto.setHomeStayNum(homeStayNum);
		dto.setRegroup(max+1);
		dto.setLoginNum(loginNum);
		dto.setLoginId(loginId);
		dto.setLoginPhoto(loginPhoto);

		System.out.println(dto);

		s.insertReview(dto);
	}

	//해당 집에 답글 입력하기
	@PostMapping("/homestays/{homeStayNum}/insertanswerofreview")
	public void insertAnswerReview(@PathVariable(value="homeStayNum") int homeStayNum,
			HttpServletRequest request, @ModelAttribute HomeStayReviewDto dto) {
		System.out.println(dto);

		s.insertAnswerReview(dto);
	}

	/*
	 * 마이페이지에서 후기 작성
	 */
	@PostMapping("/homestays/mypage/review")
	public String insertReviewByUser(
			@RequestParam int homeStayReservationNum, int homeStayNum, int loginNum, String loginId, String loginPhoto,
			String content, double cleanliness, double communication, double checkIn, double accuracy,
			double location, double satisfactionForPrice, List<MultipartFile> photos
			) throws IOException {
		
		if(s.checkReviewWritten(homeStayReservationNum) == 0) {
			HomeStayReviewDto rdto = new HomeStayReviewDto();
			int max = 0;
			if(s.checkFirstData()!=0) {
				max = s.maxOfRegroup();
			}
			rdto.setHomeStayNum(homeStayNum);
			rdto.setRegroup(max+1);
			rdto.setLoginNum(loginNum);
			rdto.setLoginId(loginId);
			rdto.setLoginPhoto(loginPhoto);
			rdto.setContent(content);
			s.insertReview(rdto);
			rs.updateReviewWrite(homeStayReservationNum);

			HashMap<String, Object> map = new HashMap<String, Object>();
			map.put("homeStayNum", homeStayNum);
			map.put("loginNum", loginNum);
			int homeStayReviewNum = s.getReviewNum(map);

			HomeStayStarDto sdto = new HomeStayStarDto();
			sdto.setHomeStayNum(homeStayNum);
			sdto.setHomeStayReviewNum(homeStayReviewNum);
			sdto.setCleanliness(cleanliness);
			sdto.setCommunication(communication);
			sdto.setCheckIn(checkIn);
			sdto.setAccuracy(accuracy);
			sdto.setLocation(location);
			sdto.setSatisfactionForPrice(satisfactionForPrice);

			ss.insertStar(sdto);

			String basePath = "homeStayReviewImg";
			for(MultipartFile file: photos) {
				String filePath = "";
				if(file.isEmpty()) {
					break;
				}else {
					String fileName = file.getOriginalFilename();
					Calendar cal = Calendar.getInstance();
					String day = cal.get(Calendar.HOUR) +""+ cal.get(Calendar.MINUTE)+""+cal.get(Calendar.SECOND);
					String changeFilename = "review" +day+ "_" + fileName;
					filePath = URLDecoder.decode(s3Service.upload(file, basePath, changeFilename),"UTF-8");
					System.out.println(filePath);
				}
				
				HomeStayReviewPhotoDto pdto = new HomeStayReviewPhotoDto();
				pdto.setHomeStayReviewNum(homeStayReviewNum);
				pdto.setPhotoName(filePath);
				ps.insertData(pdto);
			}

			return "success";
		}else {
			return "alreadyreview";
		}

	}

	//////////////////////////////////////////////////////////////////////////////////////////////
	@Data
	@AllArgsConstructor
	static class JsonAllReviews<T>{
		private T reviews;
	}
	
	@Data
	@AllArgsConstructor
	static class JsonReviewPhoto<T>{
		private T photos;
	}

}