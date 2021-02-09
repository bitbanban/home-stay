package com.bitcamp.korea_tour.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.homestay.HomeStayReviewPhotoDto;

@Mapper
public interface HomeStayReviewPhotoMapper {
	void insertData(HomeStayReviewPhotoDto dto);
	List<HomeStayReviewPhotoDto> getPhotosByHomeStayReviewNum(int homeStayReviewNum);
}
