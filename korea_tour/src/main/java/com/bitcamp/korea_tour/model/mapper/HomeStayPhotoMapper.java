package com.bitcamp.korea_tour.model.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface HomeStayPhotoMapper {
	String getHomeStayPhoto(int homeStayNum);
}
