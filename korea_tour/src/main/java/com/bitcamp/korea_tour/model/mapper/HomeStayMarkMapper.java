package com.bitcamp.korea_tour.model.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.homestay.JoinHomeStayMarkDto;

@Mapper
public interface HomeStayMarkMapper {
	int getTotalCountOfMarkByUser(int loginNum);
	List<JoinHomeStayMarkDto> getMarkListByUser(HashMap<String, Object> map);
	void insertMark(Map<String, Integer> map);
	void deleteMark(Map<String, Integer> map);
	int countOfMyMark(Map<String, Integer> map);
}
