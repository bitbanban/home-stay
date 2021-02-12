package com.bitcamp.korea_tour.model.service.homestay;

import java.util.List;

import com.bitcamp.korea_tour.model.homestay.HomeStayDetailDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayReservationDto;
import com.bitcamp.korea_tour.model.homestay.JoinHomeStayDetailDto;

public interface HomeStayHostService {
	   void insertHomeStay(JoinHomeStayDetailDto dto);
	   int getHomeStayNum();
	   int getUserNum(int homeStayNum);
	   int getHomeStayNum2(int userNum);
	   void insertHomeStayDetail(int homestayNum, JoinHomeStayDetailDto dto);
	   void updateHomeStay(JoinHomeStayDetailDto dto,int homeStayNum);
	   void updateHomeStayDetail(JoinHomeStayDetailDto dto,int homeStayNum);
	   void updateHomeStayOpen(int userNum, int open);
	   int getTotalCount(int userNum, int approval);
	   List<HomeStayReservationDto> getAllReservation(int userNum,int approval,int start, int perPage);
	   int getApprovalCount(int homeStayNum);
	   List<HomeStayReservationDto> getApprovalReservation(int homeStayNum, int start, int perPage);
	   int getRefusedCount(int homeStayNum);
	   List<HomeStayReservationDto> getRefusedReservation(int homeStayNum, int start, int perPage);
	   int getPendingCount(int homeStayNum);
	   List<HomeStayReservationDto> getPendingReservation(int homeStayNum, int start, int perPage);
	   HomeStayReservationDto getReservation(int homeStayReservationNum);
	   void updateApproval(int homeStayReservationNum, int approval);
	   JoinHomeStayDetailDto getHomeStayData(int userNum);
	   JoinHomeStayDetailDto getHomeStayDetailData(int userNum);
	   JoinHomeStayDetailDto getHomeStayAllData(int userNum);
}