package com.bitcamp.korea_tour.model.service.course;

import java.util.List;

import com.bitcamp.korea_tour.model.CourseDto;
import com.bitcamp.korea_tour.model.CourseLikeDto;
import com.bitcamp.korea_tour.model.CourseMarkDto;
import com.bitcamp.korea_tour.model.JoinCourseDetailDto;

public interface JoinCourseDetailService {
	CourseDto getCourseData(int courseNum); //메인코스 디테일에서 출력할 코스내용
	List<JoinCourseDetailDto> getCourseDetail(int courseNum);
	String getCourseMark(int courseNum, int loginNum); //디테일에서 출력할 해당 코스 즐겨찾기 목록
	String getCourseLike(int courseNum, int loginNum); //디테일에서 출력할 해당 코스 좋아요 목록
	int getCourseMarkTotal(int courseNum);
	int getCourseLikeTotal(int courseNum);
	CourseDto getMyCourseData(int courseNum, int loginNum); //마이코스 디테일에서 출력할 코스내용
	List<JoinCourseDetailDto> getMyCourseDetail(int courseNum, int loginNum);
}
