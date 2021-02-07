package com.bitcamp.korea_tour.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.PlaceDto;

@Mapper
public interface PlaceMapper {

	void insertApiPlaces(PlaceDto dto);
	void deleteAllApiPlace();
	int checkPlace(int contentId);
	void updatePlaceDetail(PlaceDto dto);
	List<PlaceDto> getAllApiPlace();
	int getUpdateStartNum();
}
