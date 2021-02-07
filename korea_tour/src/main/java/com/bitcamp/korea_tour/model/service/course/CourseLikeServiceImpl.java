package com.bitcamp.korea_tour.model.service.course;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.CourseLikeDto;
import com.bitcamp.korea_tour.model.mapper.CourseLikeMapper;
import com.bitcamp.korea_tour.model.mapper.CourseMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseLikeServiceImpl implements CourseLikeService {

	private final CourseLikeMapper courseLikeMapper;
	private final CourseMapper courseMapper;

	@Override
	public int getTotalCourseLike(int courseNum) {
		return courseLikeMapper.getTotalCourseLike(courseNum);
	}

	@Override
	public void insertCourseLike(CourseLikeDto dto) {
		courseLikeMapper.insertCourseLike(dto);
		courseMapper.UpCourseLike();
	}

	@Override
	public void deleteCourseLike(int likeNum, int courseNum) {
		Map<String, Integer> map=new HashMap<String, Integer>();
		map.put("courseNum", courseNum);
		map.put("likeNum", likeNum);
		courseLikeMapper.deleteCourseLike(map);
		courseMapper.DownCourseLike();
	}
	
}
