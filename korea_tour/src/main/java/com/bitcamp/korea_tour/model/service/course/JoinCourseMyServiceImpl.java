package com.bitcamp.korea_tour.model.service.course;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.JoinCourseDto;
import com.bitcamp.korea_tour.model.JoinCourseMarkDto;
import com.bitcamp.korea_tour.model.mapper.JoinCourseMyMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JoinCourseMyServiceImpl implements JoinCourseMyService {
	private final JoinCourseMyMapper joinCourseMyMapper;

	@Override
	public List<JoinCourseDto> getMyCourseList(int loginNum, int start, int perPage) {
		Map<String, Object> obj=new HashMap<String, Object>();
		obj.put("loginNum", loginNum);
		obj.put("start", start);
		obj.put("perPage", perPage);
		List<JoinCourseDto> list=joinCourseMyMapper.getMyCourseList(obj);
		return list;
	}

	@Override
	public List<JoinCourseMarkDto> getMyMarkCourse(int loginNum, int start, int perPage) {
		Map<String, Object> obj=new HashMap<String, Object>();
		obj.put("loginNum", loginNum);
		obj.put("start", start);
		obj.put("perPage", perPage);
		List<JoinCourseMarkDto> list=joinCourseMyMapper.getMyMarkCourse(obj);
		return list;
	}

	@Override
	public int getMyTotalCount(int loginNum) {
		return joinCourseMyMapper.getMyTotalCount(loginNum);
	}
	
	@Override
	public int getMarkTotalCount(int loginNum) {
		return joinCourseMyMapper.getMarkTotalCount(loginNum);
	}
	
}
