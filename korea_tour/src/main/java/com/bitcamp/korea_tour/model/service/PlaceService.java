package com.bitcamp.korea_tour.model.service;

import java.util.List;

import com.bitcamp.korea_tour.model.PlaceDto;

public interface PlaceService {

	void insertApiPlaces(PlaceDto dto);
	void deleteAllApiPlace();
	int checkPlace(int contentId);
	void updatePlaceDetail(PlaceDto dto);
	List<PlaceDto> getAllApiPlace();
	int getUpdateStartNum();
}
