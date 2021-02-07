package com.bitcamp.korea_tour.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.CourseDto;

@Mapper
public interface CourseMapper {
	//1. 내 코스 공간 생성(첫 작성은 기본 비공개로)
	//2. 내 코스 삭제
	//3. 공유하면 공유+1
	//4. 코스 테이블 수정(코스관광지는 coursePlace 테이블에서 처리)
	//5. 내가만든 코스 개수
	
	void insertCourseTitle(Map<String, Object> map);
	void deleteMyCourse(int courseNum);
	void updateShare(int courseNum);
	void updateCourseDetail(CourseDto courseDto);
	int getMyCourseCount(int loginNum);
	CourseDto getCourseData(int courseNum);
	CourseDto getMyCourseData(Map<String, Integer> nums);
	List<CourseDto> getMyCourseName(int loginNum);
	void UpCourseLike();
	void DownCourseLike();
}
