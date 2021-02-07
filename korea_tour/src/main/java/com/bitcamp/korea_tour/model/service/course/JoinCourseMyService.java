package com.bitcamp.korea_tour.model.service.course;

import java.util.List;
import com.bitcamp.korea_tour.model.JoinCourseDto;
import com.bitcamp.korea_tour.model.JoinCourseMarkDto;

public interface JoinCourseMyService {
	List<JoinCourseDto> getMyCourseList(int loginNum, int start, int perPage);  //세션 로그인num 받아오기
	List<JoinCourseMarkDto> getMyMarkCourse(int loginNum, int start, int perPage);  //세션 로그인num 받아오기
	int getMyTotalCount(int loginNum);
	int getMarkTotalCount(int loginNum);
}
