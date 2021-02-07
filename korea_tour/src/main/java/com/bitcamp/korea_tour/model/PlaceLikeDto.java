package com.bitcamp.korea_tour.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("placelike")
public class PlaceLikeDto {
	private int placeLikeNum;
	private int contentId;
	private int loginNum;
//	private int likeCheck;
}
