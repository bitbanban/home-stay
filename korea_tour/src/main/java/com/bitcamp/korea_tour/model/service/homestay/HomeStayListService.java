package com.bitcamp.korea_tour.model.service.homestay;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bitcamp.korea_tour.model.homestay.HomeStayDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayListDto;


public interface HomeStayListService {
	List<HomeStayListDto> getAllHomeStayList(Map<String, Object> map);
	int getTotalHomeStayList(Map<String, Object> map);
	String getHomeStayPhotoOfList(int homeStayNum);
	int isMarked(int homeStayNum, @Param("userNum")int loginNum);
	Double getAvgOfStar(int homeStayNum);
	List<HomeStayDto> getAdminHomeStayList(int start, int perPage);
	int getTotalAdminHomeStayList();
	void approveHomeStay(int homeStayNum);
	void denyHomeStay(int homeStayNum);
}
