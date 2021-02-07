package com.bitcamp.korea_tour.model.service.course;

import com.bitcamp.korea_tour.model.CourseMarkDto;

public interface CourseMarkService {
	void insertCourseMark(CourseMarkDto dto);
	void deleteCourseMark(int courseMarkNum);
	int getMyCourseMarkCount(int loginNum);
}
