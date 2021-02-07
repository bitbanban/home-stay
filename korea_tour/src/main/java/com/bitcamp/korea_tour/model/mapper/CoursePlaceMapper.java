package com.bitcamp.korea_tour.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.CoursePlaceDto;

@Mapper
public interface CoursePlaceMapper {
	//1. 코스에 관광지 입력하기 + 코스 수정시에 orderNum다시 넣기
	//2. 코스에서 관광지 하나라도 지웠을때 전부 지우기 (지우고 다시 insert)
	//3. 코스안에 관광지 개수 세기

	void insertCoursePlace(CoursePlaceDto dto);
	void deleteCoursePlace(int coursePlaceNum);
	int getTotalCoursePlace(int courseNum);
	void updateCoursePlace(CoursePlaceDto coursePlace);
	int checkNewPlaceInCourse(CoursePlaceDto dto);
}
