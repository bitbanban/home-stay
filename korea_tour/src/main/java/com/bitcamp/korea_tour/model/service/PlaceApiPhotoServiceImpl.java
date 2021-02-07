package com.bitcamp.korea_tour.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.PlaceApiPhotoDto;
import com.bitcamp.korea_tour.model.mapper.PlaceApiPhotoMapper;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PlaceApiPhotoServiceImpl implements PlaceApiPhotoService {

	@Autowired
	private final PlaceApiPhotoMapper mapper;
	
	@Override
	public void insertApiPhoto(PlaceApiPhotoDto dto) {
		// TODO Auto-generated method stub
		mapper.insertApiPhoto(dto);
	}

	@Override
	public int checkIsNewData(int contentId) {
		// TODO Auto-generated method stub
		return mapper.checkIsNewData(contentId);
	}

	@Override
	public int getCountToContentId() {
		// TODO Auto-generated method stub
		return mapper.getCountToContentId();
	}

}
