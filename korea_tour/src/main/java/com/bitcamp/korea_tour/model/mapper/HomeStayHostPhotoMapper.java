package com.bitcamp.korea_tour.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.homestay.HomeStayPhotoDto;

@Mapper
public interface HomeStayHostPhotoMapper {
	void insertPhoto(HomeStayPhotoDto dto);
	void deletePhoto(int homeStayPhotoNum);
	void updatePhoto(int homeStayPhotoNum);
	HomeStayPhotoDto getData(int homeStayPhotoNum);
	List<HomeStayPhotoDto> getData2(int userNum);
}
