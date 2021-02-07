package com.bitcamp.korea_tour.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bitcamp.korea_tour.model.JoinAnswerDto;
import com.bitcamp.korea_tour.model.TourAnswerDto;

public interface TourAnswerService {

	//place
	int getTotalCountPlaceAnswer(int loginNum);
	int getTotalCountPlaceReAnswer(int loginNum);
	void insertPlaceAnswer(TourAnswerDto dto);
	void insertPlaceReAnswer(TourAnswerDto dto);
	void deletePlaceAnswerByUser(int tourAnswerNum);
	void deletePlaceAnswerByAdmin(int tourAnswerNum);
	List<TourAnswerDto> getAnswerOfPlace(int contentId); //해당 place 댓글 출력
	//course
	int getTotalCountCourseAnswer(int loginNum);
	int getTotalCountCourseReAnswer(int loginNum);
	void insertCourseAnswer(TourAnswerDto dto);
	void insertCourseReAnswer(TourAnswerDto dto);
	void deleteCourseAnswerByUser(int tourAnswerNum);
	void deleteCourseAnswerByAdmin(int tourAnswerNum);
	List<TourAnswerDto> getAnswerOfCourse(int courseNum); //해당 course 댓글 출력

	//마이페이지용 댓글 답글
	int getTotalCountAnswer(int loginNum);
	int getTotalCountReAnswer(int loginNum);
	List<JoinAnswerDto> getUserAnswer(int loginNum, int start, int perPage);
	List<JoinAnswerDto> getUserReAnswer(int loginNum, int start, int perPage);

	//관리자페이지
	int getTotalCountAnswerAdmin();
	List<TourAnswerDto> getAdminAnswer(int start, int perPage); //댓글
	int getTotalCountReAnswerAdmin();
	List<TourAnswerDto> getAdminReAnswer(int start, int perPage); //답글



}