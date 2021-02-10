package com.bitcamp.korea_tour.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.CourseDto;
import com.bitcamp.korea_tour.model.JoinCourseDto;
import com.bitcamp.korea_tour.model.JoinCourseMarkDto;

@Mapper
public interface JoinCourseMyMapper {
	/*
	 * <mypage>
	내코스 목록보기 
	내 즐겨찾기 코스 모아보기 
	*/
	List<JoinCourseDto> getMyCourseList(Map<String, Object> obj);  //세션 로그인num 받아오기
	List<JoinCourseMarkDto> getMyMarkCourse(Map<String, Object> obj);  //세션 로그인num 받아오기
	List<CourseDto> getMyCourseNumList(Map<String, Integer> map);
	JoinCourseDto getMyCoursePlaceData(int courseNum);
	int getMyTotalCount(int loginNum);
	int getMarkTotalCount(int loginNum);
}
