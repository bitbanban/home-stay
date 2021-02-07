package com.bitcamp.korea_tour.model.service;

import java.util.HashMap;
import java.util.List;

import com.bitcamp.korea_tour.model.PlacePhotoDto;

public interface PlacePhotoService {

	void insertData(PlacePhotoDto dto);
	void deleteData(int photoNum);
	int getTotalCount();
	List<PlacePhotoDto> getDisapprovedDatas();
	void approvePhoto(int photoNum);
	PlacePhotoDto getData(int photoNum);
}
