package com.bitcamp.korea_tour.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.JoinCourseDto;

@Mapper
public interface JoinCourseSearchMapper {
	/*
	<main>
	Nav로 태그 검색한 코스보기(최신순)
	Nav로 태그 검색한 코스보기(인기순) 
	통합검색코스(검색어에 해당하는 관광지가 들어있는 코스까지) 검색쿼리 최신순
	통합겸색코스(검색어에 해당하는 관광지가 들어있는 코스까지) 검색쿼리 인기순
	맞춤코스 검색(최신순)
	맞춤코스 검색(인기순)
	*/
	List<JoinCourseDto> getSearchCourseByTime(Map<String, Object> obj);
	List<JoinCourseDto> getSearchCourseByLike(Map<String, Object> obj);
	List<JoinCourseDto> getCustomCourseByTime(Map<String, Object> obj);
	List<JoinCourseDto> getCustomCourseByLike(Map<String, Object> obj);
	int getSearchTotalCount(String keyword);
	int getCustomTotalCount(Map<String, String> tags);
}
