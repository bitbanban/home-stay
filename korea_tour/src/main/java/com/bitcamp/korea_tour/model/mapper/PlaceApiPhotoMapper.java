package com.bitcamp.korea_tour.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.PlaceApiPhotoDto;

@Mapper
public interface PlaceApiPhotoMapper {
	
	void insertApiPhoto(PlaceApiPhotoDto dto);
	int checkIsNewData(int contentId);
	int getCountToContentId();
}
