package com.bitcamp.korea_tour.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.PlaceDto;
import com.bitcamp.korea_tour.model.mapper.PlaceMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlaceServiceImpl implements PlaceService{

	@Autowired
	private final PlaceMapper mapper;
	
	
	@Override
	public void insertApiPlaces(PlaceDto dto) {
		// TODO Auto-generated method stub
		mapper.insertApiPlaces(dto);
	}


	@Override
	public void deleteAllApiPlace() {
		// TODO Auto-generated method stub
		mapper.deleteAllApiPlace();
	}


	@Override
	public int checkPlace(int contentId) {
		// TODO Auto-generated method stub
		return mapper.checkPlace(contentId);
	}


	@Override
	public void updatePlaceDetail(PlaceDto dto) {
		// TODO Auto-generated method stub
		mapper.updatePlaceDetail(dto);
	}


	@Override
	public List<PlaceDto> getAllApiPlace() {
		// TODO Auto-generated method stub
		return mapper.getAllApiPlace();
	}


	@Override
	public int getUpdateStartNum() {
		// TODO Auto-generated method stub
		return mapper.getUpdateStartNum();
	}

}
