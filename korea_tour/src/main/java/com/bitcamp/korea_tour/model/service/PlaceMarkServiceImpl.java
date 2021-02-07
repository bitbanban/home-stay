package com.bitcamp.korea_tour.model.service;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.PlaceMarkDto;
import com.bitcamp.korea_tour.model.mapper.PlaceMarkMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlaceMarkServiceImpl implements PlaceMarkService {
	
	private final PlaceMarkMapper mapper; 

	@Override
	public void insertPlaceMark(PlaceMarkDto dto) {
		// TODO Auto-generated method stub
		mapper.insertPlaceMark(dto);
	}

	@Override
	public void deletePlaceMark(int markNum) {
		// TODO Auto-generated method stub
		mapper.deletePlaceMark(markNum);
	}

	@Override
	public int getAllMyPlaceMarkCount(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getAllMyPlaceMarkCount(loginNum);
	}

	@Override
	public int getTotalPlaceMark(int userNum) {
		// TODO Auto-generated method stub
		return mapper.getTotalPlaceMark(userNum);
	}

	@Override
	public int getPlaceMarkCountByUser(PlaceMarkDto dto) {
		// TODO Auto-generated method stub
		return mapper.getPlaceMarkCountByUser(dto);
	}

	@Override
	public void deletePlaceMarkByUser(PlaceMarkDto dto) {
		// TODO Auto-generated method stub
		mapper.deletePlaceMarkByUser(dto);
	}

	@Override
	public PlaceMarkDto getDataByUser(PlaceMarkDto dto) {
		// TODO Auto-generated method stub
		return mapper.getDataByUser(dto);
	}

}
