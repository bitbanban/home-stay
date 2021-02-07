package com.bitcamp.korea_tour.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.JoinAnswerDto;
import com.bitcamp.korea_tour.model.TourAnswerDto;
import com.bitcamp.korea_tour.model.mapper.TourAnswerMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TourAnswerServiceImpl implements TourAnswerService{

	private final TourAnswerMapper mapper;
	@Override
	public void insertPlaceAnswer(TourAnswerDto dto) {
		// TODO Auto-generated method stub
		mapper.insertPlaceAnswer(dto);
	}

	@Override
	public void deletePlaceAnswerByUser(int tourAnswerNum) {
		// TODO Auto-generated method stub
		mapper.deletePlaceAnswerByUser(tourAnswerNum);
	}

	@Override
	public void deletePlaceAnswerByAdmin(int tourAnswerNum) {
		// TODO Auto-generated method stub
		mapper.deletePlaceAnswerByAdmin(tourAnswerNum);
	}

	@Override
	public List<TourAnswerDto> getAnswerOfPlace(int contentId) {
		// TODO Auto-generated method stub
		return mapper.getAnswerOfPlace(contentId);
	}


	@Override
	public void insertCourseAnswer(TourAnswerDto dto) {
		// TODO Auto-generated method stub
		mapper.insertCourseAnswer(dto);
	}

	@Override
	public void deleteCourseAnswerByUser(int tourAnswerNum) {
		// TODO Auto-generated method stub
		mapper.deleteCourseAnswerByUser(tourAnswerNum);
	}

	@Override
	public void deleteCourseAnswerByAdmin(int tourAnswerNum) {
		// TODO Auto-generated method stub
		mapper.deleteCourseAnswerByAdmin(tourAnswerNum);
	}

	@Override
	public List<TourAnswerDto> getAnswerOfCourse(int courseNum) {
		// TODO Auto-generated method stub
		return mapper.getAnswerOfCourse(courseNum);
	}


	@Override
	public List<TourAnswerDto> getAdminAnswer(int start, int perPage) {
		// TODO Auto-generated method stub
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("start", start);
		map.put("perPage", perPage);
		List<TourAnswerDto> list = mapper.getAdminAnswer(map);
		return list;
	}

	@Override
	public List<TourAnswerDto> getAdminReAnswer(int start, int perPage) {
		// TODO Auto-generated method stub
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("start", start);
		map.put("perPage", perPage);
		List<TourAnswerDto> list = mapper.getAdminReAnswer(map);
		return list;

	}

	@Override
	public int getTotalCountPlaceAnswer(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getTotalCountPlaceAnswer(loginNum);
	}

	@Override
	public int getTotalCountPlaceReAnswer(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getTotalCountPlaceReAnswer(loginNum);
	}

	@Override
	public int getTotalCountCourseAnswer(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getTotalCountCourseAnswer(loginNum);
	}

	@Override
	public int getTotalCountCourseReAnswer(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getTotalCountCourseReAnswer(loginNum);
	}


	@Override
	public List<JoinAnswerDto> getUserAnswer(int loginNum, int start, int perPage) {
		// TODO Auto-generated method stub
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("loginNum", loginNum);
		map.put("start", start);
		map.put("perPage", perPage);
		List<JoinAnswerDto> list = mapper.getUserAnswer(map);
		return list;
	}

	@Override
	public List<JoinAnswerDto> getUserReAnswer(int loginNum, int start, int perPage) {
		// TODO Auto-generated method stub
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("loginNum", loginNum);
		map.put("start", start);
		map.put("perPage", perPage);
		List<JoinAnswerDto> list = mapper.getUserReAnswer(map);
		return list;
	}

	@Override
	public int getTotalCountAnswer(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getTotalCountAnswer(loginNum);
	}

	@Override
	public int getTotalCountReAnswer(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getTotalCountReAnswer(loginNum);
	}

	@Override
	public void insertPlaceReAnswer(TourAnswerDto dto) {

		// TODO Auto-generated method stub
		mapper.insertPlaceReAnswer(dto);

	}

	@Override
	public void insertCourseReAnswer(TourAnswerDto dto) {
		// TODO Auto-generated method stub
		mapper.insertCourseReAnswer(dto);

	}

	@Override
	public int getTotalCountAnswerAdmin() {
		// TODO Auto-generated method stub
		return mapper.getTotalCountAnswerAdmin();
	}

	@Override
	public int getTotalCountReAnswerAdmin() {
		// TODO Auto-generated method stub
		return mapper.getTotalCountReAnswerAdmin();
	}



}