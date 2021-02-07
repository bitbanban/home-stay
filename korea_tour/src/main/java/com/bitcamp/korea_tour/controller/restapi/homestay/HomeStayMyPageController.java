package com.bitcamp.korea_tour.controller.restapi.homestay;

import java.sql.Date;
import java.text.SimpleDateFormat;
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
import com.bitcamp.korea_tour.model.homestay.JoinHomeStayReservationDto;
import com.bitcamp.korea_tour.model.homestay.JoinHomeStaySummary;
import com.bitcamp.korea_tour.model.homestay.JoinMypageReviewWithPhotoDto;
import com.bitcamp.korea_tour.model.homestay.JoinReservationDetail;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayReservationService;
import com.bitcamp.korea_tour.model.service.login.setting.SessionNames;
import com.bitcamp.korea_tour.model.service.paging.PagingService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/homestays")
public class HomeStayMyPageController implements SessionNames{

	private final HomeStayReservationService reservationService;
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
	
	/*
	 * 예약확인 리스트 출력(전체)
	 */
	@GetMapping("/mypage/reservations/all/{loginNum}/{currentPage}")
	public JsonReservationDataList getAllReservationDataList(
			@PathVariable(name="loginNum") int loginNum,
			@PathVariable(name="currentPage") int currentPage
			) {
		int totalCount = reservationService.getTotalCount(loginNum);
		int start = pagingService.getPagingData(totalCount, currentPage).get("start");
		int perPage = pagingService.getPagingData(totalCount, currentPage).get("perPage");
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("loginNum", loginNum);
		map.put("start", start);
		map.put("perPage", perPage);
		List<JoinHomeStayReservationDto> list = reservationService.getAllDatas(map);
		
		return new JsonReservationDataList(list, totalCount);
	}
	
	/*
	 *  예약확인 리스트 출력(예약대기)
	 */
	@GetMapping("/mypage/reservations/wating/{loginNum}/{currentPage}")
	public JsonReservationDataList getWatingReservationDataList(
			@PathVariable(name="loginNum") int loginNum,
			@PathVariable(name="currentPage") int currentPage
			) {
		int totalCount = reservationService.getCountByWating(loginNum);
		int start = pagingService.getPagingData(totalCount, currentPage).get("start");
		int perPage = pagingService.getPagingData(totalCount, currentPage).get("perPage");
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("loginNum", loginNum);
		map.put("start", start);
		map.put("perPage", perPage);
		List<JoinHomeStayReservationDto> list = reservationService.getDatasByWating(map);
		return new JsonReservationDataList(list, totalCount);
	}
	
	// 예약확인 리스트 출력(예약취소)
	@GetMapping("/mypage/reservations/cancel/{loginNum}/{currentPage}")
	public JsonReservationDataList getCanCelReservationDataList(
			@PathVariable(name="loginNum") int loginNum,
			@PathVariable(name="currentPage") int currentPage
			) {
		int totalCount = reservationService.getCountByCancel(loginNum);
		int start = pagingService.getPagingData(totalCount, currentPage).get("start");
		int perPage = pagingService.getPagingData(totalCount, currentPage).get("perPage");
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("loginNum", loginNum);
		map.put("start", start);
		map.put("perPage", perPage);
		List<JoinHomeStayReservationDto> list = reservationService.getDatasByCancel(map);
		return new JsonReservationDataList(list, totalCount);
	}
	
	/*
	 *  예약확인 리스트 출력(예약승인)
	 */
	@GetMapping("/mypage/reservations/approved/{loginNum}/{currentPage}")
	public JsonReservationDataList getApprovedReservationDataList(
			@PathVariable(name="loginNum") int loginNum,
			@PathVariable(name="currentPage") int currentPage
			) {
		int totalCount = reservationService.getCountByApproved(loginNum);
		int start = pagingService.getPagingData(totalCount, currentPage).get("start");
		int perPage = pagingService.getPagingData(totalCount, currentPage).get("perPage");
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("loginNum", loginNum);
		map.put("start", start);
		map.put("perPage", perPage);
		List<JoinHomeStayReservationDto> list = reservationService.getDatasByApproved(map);
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
		private int totalPage;
	}
	
	/*
	 * 후기 작성할 숙박완료 리스트 출력
	 */
	@GetMapping("/mypage/reservations-for-review/{loginNum}/{currentPage}")
	public JsonReservationsForReview getReservationsForReview(
			@PathVariable(name="loginNum") int loginNum,
			@PathVariable(name="currentPage") int currentPage
			) {
		int totalCount = reservationService.getTotalCountOfReservationsForReview(loginNum);
		int totalPage = pagingService.getPagingData(totalCount, currentPage).get("totalPage");
		int start = pagingService.getPagingData(totalCount, currentPage).get("start");
		int perPage = pagingService.getPagingData(totalCount, currentPage).get("perPage");
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("loginNum", loginNum);
		map.put("start", start);
		map.put("perPage", perPage);
		List<JoinMypageReviewWithPhotoDto> reservations = reservationService.getDoneReservationsByUser(map);
		for(JoinMypageReviewWithPhotoDto dto: reservations) {
			if(reservationService.checkReviewWritten(dto) == 0) {
				dto.setReviewWrite(0);
			}else if(reservationService.checkReviewWritten(dto) >= 1) {
				dto.setReviewWrite(1);
			}
		}
		
		return new JsonReservationsForReview(reservations, totalCount, totalPage);
	}
}
