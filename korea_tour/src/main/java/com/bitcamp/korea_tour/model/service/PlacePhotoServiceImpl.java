package com.bitcamp.korea_tour.model.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.PlacePhotoDto;
import com.bitcamp.korea_tour.model.mapper.PlacePhotoMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlacePhotoServiceImpl implements PlacePhotoService{

	private final PlacePhotoMapper mapper;
	
	@Override
	public void insertData(PlacePhotoDto dto) {
		// TODO Auto-generated method stub
		mapper.insertData(dto);
	}

	@Override
	public void deleteData(int photoNum) {
		// TODO Auto-generated method stub
		mapper.deleteData(photoNum);
	}

	@Override
	public List<PlacePhotoDto> getDisapprovedDatas() {
		// TODO Auto-generated method stub
		return mapper.getDisapprovedDatas();
	}

	@Override
	public void approvePhoto(int photoNum) {
		// TODO Auto-generated method stub
		mapper.approvePhoto(photoNum);
	}

	@Override
	public int getTotalCount() {
		// TODO Auto-generated method stub
		return mapper.getTotalCount();
	}

	@Override
	public PlacePhotoDto getData(int photoNum) {
		// TODO Auto-generated method stub
		return mapper.getData(photoNum);
	}

}
