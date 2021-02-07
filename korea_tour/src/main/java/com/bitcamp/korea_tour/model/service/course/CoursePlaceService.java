package com.bitcamp.korea_tour.model.service.course;

import java.util.List;

import com.bitcamp.korea_tour.model.CoursePlaceDto;

public interface CoursePlaceService {
	void insertCoursePlace(CoursePlaceDto dto);
	void deleteCoursePlace(int coursePlaceNum);
	int getTotalCoursePlace(int courseNum);
	void updateCoursePlace(List<CoursePlaceDto> list);
	int checkNewPlaceInCourse(CoursePlaceDto dto);
}
