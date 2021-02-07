package com.bitcamp.korea_tour.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.JoinCourseDetailDto;

@Mapper
public interface JoinCourseDetailMapper {
	/*
	 * <mypage>
	내코스 자세히보기 
	<main>
	메인코스 자세히 보기
	*/
	List<JoinCourseDetailDto> getMyCourseDetail(Map<String, Integer> nums);
	List<JoinCourseDetailDto> getCourseDetail(int courseNum);
}
