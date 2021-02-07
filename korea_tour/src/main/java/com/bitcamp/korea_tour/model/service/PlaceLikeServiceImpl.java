package com.bitcamp.korea_tour.model.service;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.PlaceLikeDto;
import com.bitcamp.korea_tour.model.mapper.PlaceLikeMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlaceLikeServiceImpl implements PlaceLikeService{
	
	private final PlaceLikeMapper mapper;
	
	@Override
	public int getAllPlaceLikeCount(int contentId) {
		// TODO Auto-generated method stub
		return mapper.getAllPlaceLikeCount(contentId);
	}

	@Override
	public void plusPlaceLikes(PlaceLikeDto dto) {
		// TODO Auto-generated method stub
		mapper.plusPlaceLikes(dto);
	}

	@Override
	public void deletePlaceLikes(int placeLikeNum) {
		// TODO Auto-generated method stub
		mapper.deletePlaceLikes(placeLikeNum);
	}

	@Override
	public int getPlaceLikeCountByUser(PlaceLikeDto dto) {
		// TODO Auto-generated method stub
		return mapper.getPlaceLikeCountByUser(dto);
	}

	@Override
	public void deletePlaceLikeByUser(PlaceLikeDto dto) {
		// TODO Auto-generated method stub
		mapper.deletePlaceLikeByUser(dto);
	}

	@Override
	public PlaceLikeDto getDataByUser(PlaceLikeDto dto) {
		// TODO Auto-generated method stub
		return mapper.getDataByUser(dto);
	}

}
