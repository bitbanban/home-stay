package com.bitcamp.korea_tour.model.service.homestay;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.mapper.HomeStayPhotoMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeStayPhotoServiceImpl implements HomeStayPhotoService{
	
	private final HomeStayPhotoMapper mapper;

	@Override
	public String getHomeStayPhoto(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.getHomeStayPhoto(homeStayNum);
	}

}
