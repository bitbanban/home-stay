package com.bitcamp.korea_tour.model.service.course;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.CourseDto;
import com.bitcamp.korea_tour.model.JoinCourseDto;
import com.bitcamp.korea_tour.model.mapper.CourseMapper;
import com.bitcamp.korea_tour.model.mapper.JoinCourseMainMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JoinCourseMainServiceImpl implements JoinCourseMainService {
	private final JoinCourseMainMapper joinCourseMainMapper;
	private final CourseMapper courseMapper;

	@Override
	public List<JoinCourseDto> getAllCourseByTime(String who, String during, String how,int start, int perPage) {
		Map<String, Integer> paging=new HashMap<String, Integer>();
		Map<String, Object> obj=new HashMap<String, Object>();
		obj.put("who", who);
		obj.put("during", during);
		obj.put("how", how);
		obj.put("start", start);
		obj.put("perPage", perPage);
		List<JoinCourseDto> list=joinCourseMainMapper.getAllCourseByTime(obj);
		return list;
	}

	@Override
	public List<JoinCourseDto> getAllCourseByLike(String who, String during, String how,int start, int perPage) {
		Map<String, Integer> paging=new HashMap<String, Integer>();
		Map<String, Object> obj=new HashMap<String, Object>();
		obj.put("who", who);
		obj.put("during", during);
		obj.put("how", how);
		obj.put("start", start);
		obj.put("perPage", perPage);
		List<JoinCourseDto> list=joinCourseMainMapper.getAllCourseByLike(obj);
		return list;
	}
	
	@Override
	public int getAllTotalCount() {
		return joinCourseMainMapper.getAllTotalCount();
	}
	
	@Override
	public List<CourseDto> getMyCourseName(int loginNum) {
		return courseMapper.getMyCourseName(loginNum);
	}
	
	@Override
	public String getSeason(String keyword) {
		Date date=new Date();
		int currMonth=0;
		currMonth=(int)date.getMonth()+1;
		
		switch (currMonth) {
		case 3: case 4: case 5:
			keyword="봄"; 
			break;
		case 6: case 7: case 8:
			keyword="봄"; 
			break;
		case 9:	case 10: case 11:
			keyword="봄"; 
			break;
		case 12: case 1: case 2 :
			keyword="봄"; 
			break;

		default:
			break;
		}
		
		return keyword;
	}

}
