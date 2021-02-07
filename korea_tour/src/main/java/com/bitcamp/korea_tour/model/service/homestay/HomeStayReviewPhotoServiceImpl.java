package com.bitcamp.korea_tour.model.service.homestay;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.homestay.HomeStayReviewPhotoDto;
import com.bitcamp.korea_tour.model.mapper.HomeStayReviewPhotoMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeStayReviewPhotoServiceImpl implements HomeStayReviewPhotoService{
	private final HomeStayReviewPhotoMapper mapper;

	@Override
	public void insertData(HomeStayReviewPhotoDto dto) {
		// TODO Auto-generated method stub
		mapper.insertData(dto);
	}
	
}
