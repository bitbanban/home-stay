package com.bitcamp.korea_tour.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.homestay.HomeStayReviewPhotoDto;

@Mapper
public interface HomeStayReviewPhotoMapper {
	void insertData(HomeStayReviewPhotoDto dto);
}
