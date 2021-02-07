package com.bitcamp.korea_tour.model.service.course;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.CourseDto;
import com.bitcamp.korea_tour.model.CourseLikeDto;
import com.bitcamp.korea_tour.model.CourseMarkDto;
import com.bitcamp.korea_tour.model.JoinCourseDetailDto;
import com.bitcamp.korea_tour.model.JoinCourseDto;
import com.bitcamp.korea_tour.model.mapper.CourseLikeMapper;
import com.bitcamp.korea_tour.model.mapper.CourseMapper;
import com.bitcamp.korea_tour.model.mapper.CourseMarkMapper;
import com.bitcamp.korea_tour.model.mapper.JoinCourseDetailMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JoinCourseDetailServiceImpl implements JoinCourseDetailService {
	private final JoinCourseDetailMapper joinCourseDetailMapper;
	private final CourseMapper courseMapper;
	private final CourseMarkMapper courseMarkMapper;
	private final CourseLikeMapper courseLikeMapper;

	
	@Override
	public CourseDto getCourseData(int courseNum) {
		return courseMapper.getCourseData(courseNum);
	}

	@Override
	public List<JoinCourseDetailDto> getCourseDetail(int courseNum) {
		List<JoinCourseDetailDto> list=joinCourseDetailMapper.getCourseDetail(courseNum);
		return list;
	}
	
	@Override
	public String getCourseMark(int courseNum, int loginNum) {
		Map<String, Integer> map=new HashMap<String, Integer>();
		map.put("courseNum", courseNum);
		map.put("loginNum", loginNum);
		return courseMarkMapper.getCourseMark(map);
	}
	
	@Override
	public String getCourseLike(int courseNum, int loginNum) {
		Map<String, Integer> map=new HashMap<String, Integer>();
		map.put("courseNum", courseNum);
		map.put("loginNum", loginNum);
		return courseLikeMapper.getCourseLike(map);
	}

	@Override
	public CourseDto getMyCourseData(int courseNum, int loginNum) {
		Map<String, Integer> nums=new HashMap<String, Integer>();
		nums.put("courseNum", courseNum);
		nums.put("loginNum", loginNum);
		return courseMapper.getMyCourseData(nums);
	}
	
	@Override
	public List<JoinCourseDetailDto> getMyCourseDetail(int courseNum, int loginNum) {
		Map<String, Integer> nums=new HashMap<String, Integer>();
		nums.put("courseNum", courseNum);
		nums.put("loginNum", loginNum);
		List<JoinCourseDetailDto> list=joinCourseDetailMapper.getMyCourseDetail(nums);
		return list;
	}
	
	@Override
	public int getCourseMarkTotal(int courseNum) {
		return courseMarkMapper.getCourseMarkTotal(courseNum);
	}
	
	@Override
	public int getCourseLikeTotal(int courseNum) {
		return courseLikeMapper.getCoursLikeTotal(courseNum);
	}
	
}
