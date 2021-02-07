package com.bitcamp.korea_tour.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("placeApiPhoto")
public class PlaceApiPhotoDto {

	private int placeApiPhotoNum;
	private String originImgUrl;
	private int contentId;
}
