package com.bitcamp.korea_tour.model.service;

import com.bitcamp.korea_tour.model.PlaceApiPhotoDto;

public interface PlaceApiPhotoService {

	void insertApiPhoto(PlaceApiPhotoDto dto);
	int checkIsNewData(int contentId);
	int getCountToContentId();
}
