package com.bitcamp.korea_tour.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.CourseMarkDto;

@Mapper
public interface CourseMarkMapper {
	//1. 즐겨찾기 누르기
	//2. 즐겨찾기 취소하기(userNum,CourseNum)
	//3. 즐겨찾기 목록출력
	//4. 내가 즐겨찾기한 코스 개수
	
	void insertCourseMark(CourseMarkDto dto);
	void deleteCourseMark(int courseMarkNum);
	String getCourseMark(Map<String, Integer> map);
	int getMyCourseMarkCount(int loginNum);
	int getCourseMarkTotal(int courseNum);
}
