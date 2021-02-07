package com.bitcamp.korea_tour.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("place")
public class PlaceDto {
	private int contentId;
	private String title;
	private String overview;
	private String addr1;
	private String addr2;
	private String mapX;
	private String mapY;
	private int mLevel;
	private int areaCode;
	private String linkedURL;
	private String firstImage;
}
