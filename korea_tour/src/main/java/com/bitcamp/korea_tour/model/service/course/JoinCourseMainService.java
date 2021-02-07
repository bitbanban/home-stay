package com.bitcamp.korea_tour.model.service.course;

import java.util.List;
import java.util.Map;

import com.bitcamp.korea_tour.model.CourseDto;
import com.bitcamp.korea_tour.model.CourseLikeDto;
import com.bitcamp.korea_tour.model.CourseMarkDto;
import com.bitcamp.korea_tour.model.JoinCourseDto;

public interface JoinCourseMainService {
	List<JoinCourseDto> getAllCourseByTime(String who, String during, String how, int start, int perPage);
	List<JoinCourseDto> getAllCourseByLike(String who, String during, String how, int start, int perPage);
	int getAllTotalCount();
	List<CourseDto> getMyCourseName(int loginNum);
	String getSeason(String month);
}
