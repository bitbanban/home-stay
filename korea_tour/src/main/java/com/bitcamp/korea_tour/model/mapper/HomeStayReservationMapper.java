package com.bitcamp.korea_tour.model.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.homestay.HomeStayReservationDto;
import com.bitcamp.korea_tour.model.homestay.JoinHomeStayReservationDto;
import com.bitcamp.korea_tour.model.homestay.JoinHomeStaySummary;
import com.bitcamp.korea_tour.model.homestay.JoinMypageReviewWithPhotoDto;
import com.bitcamp.korea_tour.model.homestay.JoinReservationDetail;

@Mapper
public interface HomeStayReservationMapper {
	int getTotalCount(int loginNum);
	int getCountByWating(int loginNum);
	int getCountByCancel(int loginNum);
	int getCountByApproved(int loginNum);
	List<JoinHomeStayReservationDto> getAllDatas(int loginNum);
	List<JoinHomeStayReservationDto> getDatasByWating(int loginNum);
	List<JoinHomeStayReservationDto> getDatasByCancel(int loginNum);
	List<JoinHomeStayReservationDto> getDatasByApproved(int loginNum);
	JoinHomeStaySummary getHomeStaySummary(int homeStayReservationNum);
	JoinReservationDetail getHomeStayDetail(int homeStayReservationNum);
	void cancelReservationByUser(int homeStayReservationNum);
	HomeStayReservationDto getData(int homeStayReservationNum);
	int getTotalCountOfReservationsForReview(int loginNum);
	List<JoinMypageReviewWithPhotoDto> getDoneReservationsByUser(int loginNum);
	void updateReviewWrite(int homeStayReservationNum);
	void insertMyReservation(HomeStayReservationDto dto);
}
