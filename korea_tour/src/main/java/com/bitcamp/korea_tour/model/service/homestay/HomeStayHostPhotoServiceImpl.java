package com.bitcamp.korea_tour.model.service.homestay;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.homestay.HomeStayPhotoDto;
import com.bitcamp.korea_tour.model.mapper.HomeStayHostPhotoMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeStayHostPhotoServiceImpl implements HomeStayHostPhotoService {
	
	private final HomeStayHostPhotoMapper mapper;

	@Override
	public void insertPhoto(HomeStayPhotoDto dto) {
		// TODO Auto-generated method stub
		mapper.insertPhoto(dto);
	}

	@Override
	public void deletePhoto(int homeStayPhotoNum) {
		// TODO Auto-generated method stub
		mapper.deletePhoto(homeStayPhotoNum);
	}

	@Override
	public void updatePhoto(int homeStayPhotoNum) {
		// TODO Auto-generated method stub
		mapper.updatePhoto(homeStayPhotoNum);
	}

	@Override
	public HomeStayPhotoDto getData(int homeStayPhotoNum) {
		// TODO Auto-generated method stub
		return mapper.getData(homeStayPhotoNum);
	}

	@Override
	public List<HomeStayPhotoDto> getData2(int userNum) {
		// TODO Auto-generated method stub
		return mapper.getData2(userNum);
	}
}
