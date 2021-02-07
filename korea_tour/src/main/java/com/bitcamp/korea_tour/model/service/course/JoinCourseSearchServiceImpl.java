package com.bitcamp.korea_tour.model.service.course;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.JoinCourseDto;
import com.bitcamp.korea_tour.model.mapper.JoinCourseSearchMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JoinCourseSearchServiceImpl implements JoinCourseSearchService {
	private final JoinCourseSearchMapper joinCourseSearchMapper;


	@Override
	public List<JoinCourseDto> getSearchCourseByTime(String keyword, int start, int perPage) {
		Map<String, Object> obj=new HashMap<String, Object>();
		obj.put("keyword", keyword);
		obj.put("start", start);
		obj.put("perPage", perPage);
		List<JoinCourseDto> list=joinCourseSearchMapper.getSearchCourseByTime(obj);
		return list;
	}

	@Override
	public List<JoinCourseDto> getSearchCourseByLike(String keyword, int start, int perPage) {
		Map<String, Object> obj=new HashMap<String, Object>();
		obj.put("keyword", keyword);
		obj.put("start", start);
		obj.put("perPage", perPage);
		List<JoinCourseDto> list=joinCourseSearchMapper.getSearchCourseByLike(obj);
		return list;
	}

	@Override
	public List<JoinCourseDto> getCustomCourseByTime(String who, String during, String how, int start, int perPage) {
		Map<String, Object> obj=new HashMap<String, Object>();
		obj.put("who", who);
		obj.put("during", during);
		obj.put("how", how);
		obj.put("start", start);
		obj.put("perPage", perPage);
		List<JoinCourseDto> list=joinCourseSearchMapper.getCustomCourseByTime(obj);
		return list;
	}

	@Override
	public List<JoinCourseDto> getCustomCourseByLike(String who, String during, String how, int start, int perPage) {
		Map<String, Object> obj=new HashMap<String, Object>();
		obj.put("who", who);
		obj.put("during", during);
		obj.put("how", how);
		obj.put("start", start);
		obj.put("perPage", perPage);
		List<JoinCourseDto> list=joinCourseSearchMapper.getCustomCourseByLike(obj);
		return list;
	}

	@Override
	public int getSearchTotalCount(String keyword) {
		return joinCourseSearchMapper.getSearchTotalCount(keyword);
	}
	
	@Override
	public int getCustomTotalCount(String who, String during, String how) {
		Map<String, String> tags=new HashMap<String, String>();
		tags.put("who", who);
		tags.put("during", during);
		tags.put("how", how);
		return joinCourseSearchMapper.getCustomTotalCount(tags);
	}
}
