package com.bitcamp.korea_tour.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("placemark")
public class PlaceMarkDto {
	private int markNum;
	private int userNum;
	private int contentId;
}
