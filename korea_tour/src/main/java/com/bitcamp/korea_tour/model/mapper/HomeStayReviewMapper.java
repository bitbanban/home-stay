package com.bitcamp.korea_tour.model.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.homestay.HomeStayReviewDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayReviewPhotoDto;

@Mapper
public interface HomeStayReviewMapper {
		/*
		 * 리뷰출력(글쓴이, 내용)
		 * 리뷰출력(해당 댓글에 해당하는 사진)
		 * Regroup Max 값 구하기
		 * 댓글쓰기
		 * 답글쓰기
		 * */
		List<HomeStayReviewDto> getAllReview(int homeStayNum);
		List<HomeStayReviewPhotoDto> getAllReviewPhoto(int homeStayReviewNum);
		int maxOfRegroup();
		void insertReview(HomeStayReviewDto dto);
		void insertAnswerReview(HomeStayReviewDto dto);
		int getReviewNum(HashMap<String, Object> map);
		int ifReply(Map<String, Integer> map);
		int checkReviewWritten(int homeStayReservationNum);
		List<HomeStayReviewDto> getReviewByloginNum(HashMap<String, Object> map);
		int getTotalCountOfReviewsByLoginNum(int loginNum);
		HomeStayReviewDto getReviewByHomeStayReviewNum(int homeStayReviewNum);
}
 