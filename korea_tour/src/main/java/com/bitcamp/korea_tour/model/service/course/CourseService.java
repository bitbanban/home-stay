package com.bitcamp.korea_tour.model.service.course;

import com.bitcamp.korea_tour.model.CourseDto;

public interface CourseService {
	void insertCourseTitle(String name, int loginNum);
	void deleteMyCourse(int courseNum);
	void updateShare(int courseNum);
	void updateCourseDetail(CourseDto dto);
	int getMyCourseCount(int loginNum);
}
