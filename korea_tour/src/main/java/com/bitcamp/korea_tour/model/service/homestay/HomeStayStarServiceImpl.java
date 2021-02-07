package com.bitcamp.korea_tour.model.service.homestay;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.homestay.HomeStayStarDto;
import com.bitcamp.korea_tour.model.mapper.HomeStayStarMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeStayStarServiceImpl implements HomeStayStarService{

	private final HomeStayStarMapper mapper;

	@Override
	public void insertStar(HomeStayStarDto dto) {
		// TODO Auto-generated method stub
		mapper.insertStar(dto);
	}
}
