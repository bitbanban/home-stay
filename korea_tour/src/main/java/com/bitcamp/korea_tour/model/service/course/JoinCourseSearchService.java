package com.bitcamp.korea_tour.model.service.course;

import java.util.List;

import com.bitcamp.korea_tour.model.JoinCourseDto;

public interface JoinCourseSearchService {
	List<JoinCourseDto> getSearchCourseByTime(String keyword, int start, int perPage);
	List<JoinCourseDto> getSearchCourseByLike(String keyword, int start, int perPage);
	List<JoinCourseDto> getCustomCourseByTime(String who, String during, String how, int start, int perPage);
	List<JoinCourseDto> getCustomCourseByLike(String who, String during, String how, int start, int perPage);
	int getSearchTotalCount(String keyword);
	int getCustomTotalCount(String who, String during, String how);
}
