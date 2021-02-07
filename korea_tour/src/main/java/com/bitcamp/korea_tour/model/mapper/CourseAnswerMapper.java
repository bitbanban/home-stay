package com.bitcamp.korea_tour.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.CourseAnswerDto;

@Mapper
public interface CourseAnswerMapper {
	//1.댓글입력
	//2.답글입력
	//3.유저가 댓글 지우기
	//4.관리자가 댓글 지우기
	//5.코스에 댓글 달기
	//6.mypage에서 내 댓글 받아오기
	//7.관리자page에서 보는 댓글들 
	
	void insertCourseAnswer(CourseAnswerDto dto);
	void insertCourseAnswerRE(CourseAnswerDto dto);
	void deleteCourseAnswerByUser(int courseAnswerNum);
	void deleteCourseAnswerByAdmin(int courseAnswerNum);
	CourseAnswerDto getAnswerOfCourse();
	CourseAnswerDto getUserAnswer(Map<String, Integer> map);
	CourseAnswerDto getAdminAnswer(int level);
}
