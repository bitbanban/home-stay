package com.bitcamp.korea_tour.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.homestay.HomeStayDetailDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayReservationDto;
import com.bitcamp.korea_tour.model.homestay.JoinHomeStayDetailDto;

@Mapper
public interface HomeStayHostMapper {
   void insertHomeStay(JoinHomeStayDetailDto dto);
   int getHomeStayNum();
   int getUserNum(int homeStayNum);
   int getHomeStayNum2(int userNum);
   void insertHomeStayDetail(Map<String, Object> map);
   void updateHomeStay(Map<String, Object> map);
   void updateHomeStayDetail(Map<String, Object> map);
   void updateHomeStayOpen(Map<String, Object> map);
   int getTotalCount(Map<String, Object> map);
   List<HomeStayReservationDto> getAllReservation(Map<String, Object> map);
   int getApprovalCount(int homeStayNum);
   List<HomeStayReservationDto> getApprovalReservation(Map<String, Object> map);
   int getRefusedCount(int homeStayNum);
   List<HomeStayReservationDto> getRefusedReservation(Map<String, Object> map);
   int getPendingCount(int homeStayNum);
   List<HomeStayReservationDto> getPendingReservation(Map<String, Object> map);
   HomeStayReservationDto getReservation(int homeStayReservationNum);
   void updateApproval(Map<String, Object> map);
   JoinHomeStayDetailDto getHomeStayData(int userNum);
   JoinHomeStayDetailDto getHomeStayDetailData(int userNum);
   JoinHomeStayDetailDto getHomeStayAllData(int userNum);
}