package com.bitcamp.korea_tour.model.service.homestay;

import java.util.HashMap;
import java.util.List;

import com.bitcamp.korea_tour.model.homestay.HomeStayReservationDto;
import com.bitcamp.korea_tour.model.homestay.JoinHomeStayReservationDto;
import com.bitcamp.korea_tour.model.homestay.JoinHomeStaySummary;
import com.bitcamp.korea_tour.model.homestay.JoinMypageReviewWithPhotoDto;
import com.bitcamp.korea_tour.model.homestay.JoinReservationDetail;

public interface HomeStayReservationService {
	int getTotalCount(int loginNum);
	int getCountByWating(int loginNum);
	int getCountByCancel(int loginNum);
	int getCountByApproved(int loginNum);
	List<JoinHomeStayReservationDto> getAllDatas(HashMap<String, Object> map);
	List<JoinHomeStayReservationDto> getDatasByWating(HashMap<String, Object> map);
	List<JoinHomeStayReservationDto> getDatasByCancel(HashMap<String, Object> map);
	List<JoinHomeStayReservationDto> getDatasByApproved(HashMap<String, Object> map);
	JoinHomeStaySummary getHomeStaySummary(int homeStayReservationNum);
	JoinReservationDetail getHomeStayDetail(int homeStayReservationNum);
	void cancelReservationByUser(int homeStayReservationNum);
	HomeStayReservationDto getData(int homeStayReservationNum);
	int getTotalCountOfReservationsForReview(int loginNum);
	List<JoinMypageReviewWithPhotoDto> getDoneReservationsByUser(HashMap<String, Object> map);
	int checkReviewWritten(JoinMypageReviewWithPhotoDto dto);
	void insertMyReservation(HomeStayReservationDto dto);
}
