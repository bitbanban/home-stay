package com.bitcamp.korea_tour.model.service;

import com.bitcamp.korea_tour.model.PlaceLikeDto;

public interface PlaceLikeService {
	int getAllPlaceLikeCount(int contentId); 
	void plusPlaceLikes(PlaceLikeDto dto); 
	void deletePlaceLikes(int placeLikeNum); 
	PlaceLikeDto getDataByUser(PlaceLikeDto dto);
	int getPlaceLikeCountByUser(PlaceLikeDto dto);
	void deletePlaceLikeByUser(PlaceLikeDto dto);
}
