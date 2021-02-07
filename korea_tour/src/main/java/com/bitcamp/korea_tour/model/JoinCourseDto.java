package com.bitcamp.korea_tour.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("joincourse")
public class JoinCourseDto {
//	course_tb
	private int courseNum;
	private int userNum;
	private String name;
	private String content;
	private String who;
	private String during;
	private String how;
	private int totalLike;
	
//	courseplace_tb
	
//	place_tb
	private String title;
	private String firstImage;
	private String addr1;
}
