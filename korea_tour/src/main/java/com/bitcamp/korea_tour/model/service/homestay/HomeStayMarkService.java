package com.bitcamp.korea_tour.model.service.homestay;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.bitcamp.korea_tour.model.homestay.JoinHomeStayMarkDto;

public interface HomeStayMarkService {
	int getTotalCountOfMarkByUser(int loginNum);
	List<JoinHomeStayMarkDto> getMarkListByUser(HashMap<String, Object> map);
	void insertMark(@Param("homeStayNum") int homeStayNum, int loginNum);
	void deleteMark(@Param("homeStayNum") int homeStayNum, int loginNum);
	int countOfMyMark(int homeStayNum, int loginNum);
}
