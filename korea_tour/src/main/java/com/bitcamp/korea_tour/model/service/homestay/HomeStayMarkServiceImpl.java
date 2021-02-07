package com.bitcamp.korea_tour.model.service.homestay;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.homestay.JoinHomeStayMarkDto;
import com.bitcamp.korea_tour.model.mapper.HomeStayMarkMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeStayMarkServiceImpl implements HomeStayMarkService {
	
	private final HomeStayMarkMapper homeStayMarkMapper;
	
	@Override
	public void insertMark(@Param("homeStayNum") int homeStayNum, int loginNum) {
		Map<String, Integer> map=new HashMap<String, Integer>();
		map.put("homeStayNum", homeStayNum);
		map.put("loginNum", loginNum);
		homeStayMarkMapper.insertMark(map);
	}
	
	@Override
	public void deleteMark(@Param("homeStayNum") int homeStayNum, int loginNum) {
		Map<String, Integer> map=new HashMap<String, Integer>();
		map.put("homeStayNum", homeStayNum);
		map.put("loginNum", loginNum);
		homeStayMarkMapper.deleteMark(map);
	}

	@Override
	public int getTotalCountOfMarkByUser(int loginNum) {
		// TODO Auto-generated method stub
		return homeStayMarkMapper.getTotalCountOfMarkByUser(loginNum);
	}

	@Override
	public List<JoinHomeStayMarkDto> getMarkListByUser(HashMap<String, Object> map) {
		// TODO Auto-generated method stub
		return homeStayMarkMapper.getMarkListByUser(map);
	}

	@Override
	public int countOfMyMark(int homeStayNum, int loginNum) {
		// TODO Auto-generated method stub
		Map<String, Integer> map=new HashMap<String, Integer>();
		map.put("homeStayNum", homeStayNum);
		map.put("loginNum", loginNum);
		
		return homeStayMarkMapper.countOfMyMark(map);
	}
	
	
}
