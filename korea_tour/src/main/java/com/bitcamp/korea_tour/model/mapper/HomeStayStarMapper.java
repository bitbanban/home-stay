package com.bitcamp.korea_tour.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.homestay.HomeStayStarDto;

@Mapper
public interface HomeStayStarMapper {
	void insertStar(HomeStayStarDto dto);
	HomeStayStarDto getDataByHomeStayReviewNum(int homeStayReviewNum);
}
