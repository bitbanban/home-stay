package com.bitcamp.korea_tour.model.service.homestay;

import java.util.List;

import com.bitcamp.korea_tour.model.homestay.HomeStayReviewPhotoDto;

public interface HomeStayReviewPhotoService {
	void insertData(HomeStayReviewPhotoDto dto);
	List<HomeStayReviewPhotoDto> getPhotosByHomeStayReviewNum(int homeStayReviewNum);

}
