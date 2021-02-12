package com.bitcamp.korea_tour.model.service.homestay;

import java.util.List;

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

	@Override
	public List<HomeStayReviewPhotoDto> getPhotosByHomeStayReviewNum(int homeStayReviewNum) {
		// TODO Auto-generated method stub
		return mapper.getPhotosByHomeStayReviewNum(homeStayReviewNum);
	}
	
}
