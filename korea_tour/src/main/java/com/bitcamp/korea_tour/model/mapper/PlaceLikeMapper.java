package com.bitcamp.korea_tour.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.PlaceLikeDto;

@Mapper
public interface PlaceLikeMapper {
	int getAllPlaceLikeCount(int contentId); 
	void plusPlaceLikes(PlaceLikeDto dto); 
	void deletePlaceLikes(int placeLikeNum); 
	PlaceLikeDto getDataByUser(PlaceLikeDto dto);
	int getPlaceLikeCountByUser(PlaceLikeDto dto);
	void deletePlaceLikeByUser(PlaceLikeDto dto);
}
