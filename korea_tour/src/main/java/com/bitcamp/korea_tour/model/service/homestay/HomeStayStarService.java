package com.bitcamp.korea_tour.model.service.homestay;

import com.bitcamp.korea_tour.model.homestay.HomeStayStarDto;

public interface HomeStayStarService {
	void insertStar(HomeStayStarDto dto);
	HomeStayStarDto getDataByHomeStayReviewNum(int homeStayReviewNum);
}
