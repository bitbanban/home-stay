package com.bitcamp.korea_tour.model.service.course;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.CourseMarkDto;
import com.bitcamp.korea_tour.model.mapper.CourseMarkMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseMarkServiceImpl implements CourseMarkService{
	
	private final CourseMarkMapper courseMarkMapper;

	@Override
	public void insertCourseMark(CourseMarkDto dto) {
		courseMarkMapper.insertCourseMark(dto);
	}

	@Override
	public void deleteCourseMark(int courseMarkNum) {
		courseMarkMapper.deleteCourseMark(courseMarkNum);
	}

	@Override
	public int getMyCourseMarkCount(int loginNum) {
		// TODO Auto-generated method stub
		return courseMarkMapper.getMyCourseMarkCount(loginNum);
	}
	
	
	
	
}
