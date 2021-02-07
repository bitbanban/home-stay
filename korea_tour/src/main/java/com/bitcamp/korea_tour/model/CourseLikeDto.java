package com.bitcamp.korea_tour.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("courselike")
public class CourseLikeDto {
	private int likeNum;
	private int userNum;
	private int courseNum;
	private String loginNum;
}
