package com.bitcamp.korea_tour.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("joinplace")
public class JoinPlaceDto {
// placePhoto_tb
	private int photoNum;
	private int contentId;
	private int approval;
	private String image;
	private String loginId;

// placeMark_tb
	
	private int markNum;
	private int userNum;
	private int placeNum;

// placeApiPhoto_tb
	
	private int placeApiPhotoNum;
	private String originImgUrl;
	//private int contentId;
}
