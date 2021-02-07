package com.bitcamp.korea_tour.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.PlaceMarkDto;

@Mapper
public interface PlaceMarkMapper {
	int getTotalPlaceMark(int userNum);
	void insertPlaceMark(PlaceMarkDto dto);
	void deletePlaceMark(int markNum);
	int getAllMyPlaceMarkCount(int loginNum); 
	PlaceMarkDto getDataByUser(PlaceMarkDto dto);
	int getPlaceMarkCountByUser(PlaceMarkDto dto);
	void deletePlaceMarkByUser(PlaceMarkDto dto);
}

