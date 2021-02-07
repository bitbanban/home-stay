package com.bitcamp.korea_tour.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.JoinCourseDto;

@Mapper
public interface JoinCourseMainMapper {
	/*
	<main>
	모든코스 모아보기(최신순) 
	모든코스 모아보기(인기순) 
	*/
	List<JoinCourseDto> getAllCourseByTime(Map<String, Object> obj);
	List<JoinCourseDto> getAllCourseByLike(Map<String, Object> obj);
	int getAllTotalCount();
}
