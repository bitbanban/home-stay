package com.bitcamp.korea_tour.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.CourseLikeDto;

@Mapper
public interface CourseLikeMapper {
	//1. 그 코스의 좋아요 개수
	//2. 내가 좋아요를 누른 곳 (user, courseNum,loginId)
	//3. 내가 좋아요 누른거 취소 (loginId(String), courseNum(int)) -hashmap
	//4. 디테일 코스 좋아요 목록
	
	int getTotalCourseLike(int courseNum);
	void insertCourseLike(CourseLikeDto dto);
	void deleteCourseLike(Map<String, Integer> map);
	String getCourseLike(Map<String, Integer> map);
	int getCoursLikeTotal(int courseNum);
}
