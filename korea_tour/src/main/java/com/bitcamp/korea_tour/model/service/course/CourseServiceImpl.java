package com.bitcamp.korea_tour.model.service.course;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.CourseDto;
import com.bitcamp.korea_tour.model.mapper.CourseMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {
	private final CourseMapper courseMapper;

	@Override
	public void insertCourseTitle(@Param("name") String name, @Param("loginNum") int loginNum) {
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("name", name);
		map.put("loginNum", loginNum);
		courseMapper.insertCourseTitle(map);
	}

	@Override
	public void deleteMyCourse(int courseNum) {
		courseMapper.deleteMyCourse(courseNum);
	}

	@Override
	public void updateShare(int courseNum) {
		courseMapper.updateShare(courseNum);
	}

	@Override
	public void updateCourseDetail(CourseDto dto) {
		courseMapper.updateCourseDetail(dto);
	}

	@Override
	public int getMyCourseCount(int loginNum) {
		// TODO Auto-generated method stub
		return courseMapper.getMyCourseCount(loginNum);
	}
	
}
