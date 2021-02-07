package com.bitcamp.korea_tour.model.service.course;

import com.bitcamp.korea_tour.model.CourseLikeDto;

public interface CourseLikeService {
	int getTotalCourseLike(int courseNum);
	void insertCourseLike(CourseLikeDto dto);
	void deleteCourseLike(int likeNum, int courseNum);
}
