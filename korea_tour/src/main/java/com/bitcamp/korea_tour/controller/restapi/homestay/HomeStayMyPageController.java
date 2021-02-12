package com.bitcamp.korea_tour.controller.restapi.homestay;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.korea_tour.model.UserDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayReservationDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayReviewDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayReviewPhotoDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayStarDto;
import com.bitcamp.korea_tour.model.homestay.JoinHomeStayReservationDto;
import com.bitcamp.korea_tour.model.homestay.JoinHomeStaySummary;
import com.bitcamp.korea_tour.model.homestay.JoinMypageReviewWithPhotoDto;
import com.bitcamp.korea_tour.model.homestay.JoinReservationDetail;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayPhotoService;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayReservationService;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayReviewPhotoService;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayReviewService;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayService;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayStarService;
import com.bitcamp.korea_tour.model.service.login.setting.SessionNames;
import com.bitcamp.korea_tour.model.service.paging.PagingService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/homestays")
public class HomeStayMyPageController implements SessionNames{

	private final HomeStayService hs;
	private final HomeStayReservationService reservationService;
	private final HomeStayReviewService reviewService;
	private final HomeStayReviewPhotoService reviewPhotoService;
	private final HomeStayStarService starService;
	private final HomeStayPhotoService ps;
	private final PagingService pagingService;
	int totalCount = 0;
	int start = 0;
	int perPage = 10;
	
	@Data
	@AllArgsConstructor
	static class JsonReservationDataList {
		private List<JoinHomeStayReservationDto> reservations;
		private int totalCount;
	}
	
	@Data
	@AllArgsConstructor
	static class JsonReviewsByLoginNum {
		private List<JsonReviewWithPhotos> reviews;
		private int totalCount;
	}
	
	@Data
	@AllArgsConstructor
	static class JsonReviewWithPhotos {
		private int homeStayReviewNum;
		private int hostNum;
		private int homeStayNum;
		private String homeStayPhoto; 
		private String hostName;
		private int relevel;
		private int regroup;
		private int loginNum;
		private String loginId;
		private String loginPhoto;
		private String content;
		private Date writeday;
		private int deleted;
		private double cleanliness;
		private double communication;
		private double checkIn;
		private double accuracy;
		private double location;
		private double satisfactionForPrice;
		private List<HomeStayReviewPhotoDto> reviewPhotos;
	}
	
	/*
	 * 예약확인 리스트 출력(전체)
	 */
	@GetMapping("/mypage/reservations/all/{loginNum}")
	public JsonReservationDataList getAllReservationDataList(
			@PathVariable(name="loginNum") int loginNum
			) {
		int totalCount = reservationService.getTotalCount(loginNum);
		List<JoinHomeStayReservationDto> list = reservationService.getAllDatas(loginNum);
		
		return new JsonReservationDataList(list, totalCount);
	}
	
	/*
	 *  예약확인 리스트 출력(예약대기)
	 */
	@GetMapping("/mypage/reservations/wating/{loginNum}")
	public JsonReservationDataList getWatingReservationDataList(
			@PathVariable(name="loginNum") int loginNum
			) {
		int totalCount = reservationService.getCountByWating(loginNum);
		List<JoinHomeStayReservationDto> list = reservationService.getDatasByWating(loginNum);
		return new JsonReservationDataList(list, totalCount);
	}
	
	// 예약확인 리스트 출력(예약취소)
	@GetMapping("/mypage/reservations/cancel/{loginNum}")
	public JsonReservationDataList getCanCelReservationDataList(
			@PathVariable(name="loginNum") int loginNum
			) {
		int totalCount = reservationService.getCountByCancel(loginNum);
		List<JoinHomeStayReservationDto> list = reservationService.getDatasByCancel(loginNum);
		return new JsonReservationDataList(list, totalCount);
	}
	
	/*
	 *  예약확인 리스트 출력(예약승인)
	 */
	@GetMapping("/mypage/reservations/approved/{loginNum}")
	public JsonReservationDataList getApprovedReservationDataList(
			@PathVariable(name="loginNum") int loginNum
			) {
		int totalCount = reservationService.getCountByApproved(loginNum);
		List<JoinHomeStayReservationDto> list = reservationService.getDatasByApproved(loginNum);
		return new JsonReservationDataList(list, totalCount);
	}
	
	/*
	 * 예약확인 상세 출력1
	 */
	@GetMapping("/mypage/reservation/detail/homeStay/summary/{homeStayReservationNum}")
	public JoinHomeStaySummary getHomeStaySummary(
			@PathVariable(name="homeStayReservationNum") int homeStayReservationNum) {
		JoinHomeStaySummary jsonData = reservationService.getHomeStaySummary(homeStayReservationNum);
		return jsonData;
	}
	
	/*
	 * 예약확인 상세 출력2
	 */
	@GetMapping("/mypage/reservation/detail/{homeStayReservationNum}")
	public JoinReservationDetail getReservationDetail(
			@PathVariable(name="homeStayReservationNum") int homeStayReservationNum) {
		JoinReservationDetail jsonData = reservationService.getHomeStayDetail(homeStayReservationNum);
		return jsonData;
	}
	
	/*
	 * 유저가 예약취소
	 */
	@PatchMapping("/mypage/reservation/customer/cancel/{homeStayReservationNum}")
	public String cancelReservationByUser(
			@PathVariable(name="homeStayReservationNum") int homeStayReservationNum) {
		HomeStayReservationDto dto = reservationService.getData(homeStayReservationNum);
		if(dto.getApproval() == 1 || dto.getDeleted() == 1) {
			return "alreadycancel";
		}else if(dto.getApproval() == 0 && dto.getDeleted() == 0){
			reservationService.cancelReservationByUser(homeStayReservationNum);
			return "success";
		}else {
			return "fail";
		}
	}
	
	@Data
	@AllArgsConstructor
	static class JsonReservationsForReview {
		private List<JoinMypageReviewWithPhotoDto> reservations;
		private int totalCount;
	}
	
	/*
	 * 후기 작성할 숙박완료 리스트 출력
	 */
	@GetMapping("/mypage/reservations-for-review/{loginNum}")
	public JsonReservationsForReview getReservationsForReview(
			@PathVariable(name="loginNum") int loginNum
			) {
		int totalCount = reservationService.getTotalCountOfReservationsForReview(loginNum);
		List<JoinMypageReviewWithPhotoDto> reservations = reservationService.getDoneReservationsByUser(loginNum);
		
		return new JsonReservationsForReview(reservations, totalCount);
	}
	
	/**
	 * 유저의 후기 리스트
	 */
	@GetMapping("/mypage/reviews/{loginNum}")
	public JsonReviewsByLoginNum getReviewListByLoginNum(
			@PathVariable(name="loginNum") int loginNum) {
		int totalCount = reviewService.getTotalCountOfReviewsByLoginNum(loginNum);
		List<HomeStayReviewDto> rlist = reviewService.getReviewByloginNum(loginNum);
		List<JsonReviewWithPhotos> reviews = new ArrayList<HomeStayMyPageController.JsonReviewWithPhotos>();
		for(HomeStayReviewDto rdto: rlist) {
			int homeStayReviewNum = rdto.getHomeStayReviewNum();
			int hostNum = rdto.getUserNum();
			int homeStayNum = rdto.getHomeStayNum();
			String homeStayPhoto = ps.getHomeStayPhoto(homeStayNum);
			String hostName = hs.getHostName(homeStayNum);
			int relevel = rdto.getRelevel();
			int regroup = rdto.getRegroup();
			String loginId = rdto.getLoginId();
			String loginPhoto = rdto.getLoginPhoto();
			String content = rdto.getContent();
			Date writeday = rdto.getWriteday();
			int deleted = rdto.getDeleted();
			double cleanliness = 0;
			double communication = 0;
			double checkIn = 0;
			double accuracy = 0;
			double location = 0;
			double satisfactionForPrice = 0;
			if(starService.getDataByHomeStayReviewNum(homeStayReviewNum) != null) {
				HomeStayStarDto sdto = starService.getDataByHomeStayReviewNum(homeStayReviewNum);
				cleanliness = sdto.getCleanliness();
				communication = sdto.getCommunication();
				checkIn = sdto.getCheckIn();
				accuracy = sdto.getAccuracy();
				location = sdto.getLocation();
				satisfactionForPrice = sdto.getSatisfactionForPrice();
			}
			List<HomeStayReviewPhotoDto> reviewPhotos = reviewPhotoService.getPhotosByHomeStayReviewNum(homeStayReviewNum);
			JsonReviewWithPhotos review = new JsonReviewWithPhotos(homeStayReviewNum, hostNum, homeStayNum, homeStayPhoto, hostName, relevel, regroup, loginNum,
					loginId, loginPhoto, content, writeday, deleted, cleanliness, communication, checkIn, accuracy, 
					location, satisfactionForPrice, reviewPhotos);
			reviews.add(review);
		}
		
		return new JsonReviewsByLoginNum(reviews, totalCount);
	}
	
	/**
	 * 유저 후기 상세
	 * @GetMapping("/mypage/review/{homeStayReviewNum}")
	public JsonReviewWithPhotos getReviewDetail(
			@PathVariable(name="homeStayReviewNum") int homeStayReviewNum) {
		HomeStayReviewDto rdto = reviewService.getReviewByHomeStayReviewNum(homeStayReviewNum);
		int hostNum = rdto.getUserNum();
		int homeStayNum = rdto.getHomeStayNum();
		String homeStayPhoto = ps.getHomeStayPhoto(homeStayNum);
		String hostName = hs.getHostName(homeStayNum);
		int relevel = rdto.getRelevel();
		int regroup = rdto.getRegroup();
		int loginNum = rdto.getLoginNum();
		String loginId = rdto.getLoginId();
		String loginPhoto = rdto.getLoginPhoto();
		String content = rdto.getContent();
		Date writeday = rdto.getWriteday();
		int deleted = rdto.getDeleted();
		double cleanliness = 0;
		double communication = 0;
		double checkIn = 0;
		double accuracy = 0;
		double location = 0;
		double satisfactionForPrice = 0;
		if(starService.getDataByHomeStayReviewNum(homeStayReviewNum) != null) {
			HomeStayStarDto sdto = starService.getDataByHomeStayReviewNum(homeStayReviewNum);
			cleanliness = sdto.getCleanliness();
			communication = sdto.getCommunication();
			checkIn = sdto.getCheckIn();
			accuracy = sdto.getAccuracy();
			location = sdto.getLocation();
			satisfactionForPrice = sdto.getSatisfactionForPrice();
		}
		List<HomeStayReviewPhotoDto> reviewPhotos = reviewPhotoService.getPhotosByHomeStayReviewNum(homeStayReviewNum);
		return new JsonReviewWithPhotos(homeStayReviewNum, hostNum, homeStayNum, homeStayPhoto, hostName, relevel, regroup, loginNum,
				loginId, loginPhoto, content, writeday, deleted, cleanliness, communication, checkIn, accuracy, 
				location, satisfactionForPrice, reviewPhotos);
	}
	 */
	
}
