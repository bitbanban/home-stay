package com.bitcamp.korea_tour.model.service.homestay;

import java.util.HashMap;
import java.util.List;

import com.bitcamp.korea_tour.model.homestay.HomeStayReviewDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayReviewPhotoDto;
import com.bitcamp.korea_tour.model.homestay.JoinHomeStayReviewDto;

public interface HomeStayReviewService {
	List<HomeStayReviewDto> getAllReview(int homeStayNum);
	List<HomeStayReviewPhotoDto> getAllReviewPhoto(int homeStayReviewNum);
	int maxOfRegroup();
	void insertReview(HomeStayReviewDto dto);
	void insertAnswerReview(HomeStayReviewDto dto);
	int getReviewNum(HashMap<String, Object> map);
	int ifReply(int homeStayNum, int regroup);
	int checkReviewWritten(int homeStayReservationNum);
	List<HomeStayReviewDto> getReviewByloginNum(HashMap<String, Object> map);
	int getTotalCountOfReviewsByLoginNum(int loginNum);
	HomeStayReviewDto getReviewByHomeStayReviewNum(int homeStayReviewNum);
}
