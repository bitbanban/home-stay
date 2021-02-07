package com.bitcamp.korea_tour.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.homestay.HomeStayDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayListDto;

@Mapper
public interface HomeStayListMapper {
	List<HomeStayListDto> getAllHomeStayList(Map<String, Object> map);
	int getTotalHomeStayList();
	Integer getHomeStayPhotoNumOfList(int homeStayNum);
	String getHomeStayPhotoOfList(int homeStayPhotoNum);
	int isMarked(Map<String, Integer> map);
	Double getAvgOfStar(int homeStayNum);
	List<HomeStayDto> getAdminHomeStayList(Map<String, Integer> map);
	int getTotalAdminHomeStayList();
	void approveHomeStay(int homeStayNum);
	void denyHomeStay(int homeStayNum);
}
