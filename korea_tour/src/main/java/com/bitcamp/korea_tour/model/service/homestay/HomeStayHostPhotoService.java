package com.bitcamp.korea_tour.model.service.homestay;

import java.util.List;

import com.bitcamp.korea_tour.model.homestay.HomeStayPhotoDto;

public interface HomeStayHostPhotoService {
	void insertPhoto(HomeStayPhotoDto dto);
	void deletePhoto(int homeStayPhotoNum);
	void updatePhoto(int homeStayPhotoNum);
	HomeStayPhotoDto getData(int homeStayPhotoNum);
	List<HomeStayPhotoDto> getData2(int userNum);
}

