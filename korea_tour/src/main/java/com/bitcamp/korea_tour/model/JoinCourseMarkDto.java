package com.bitcamp.korea_tour.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("joincoursemark")
public class JoinCourseMarkDto {
//	coursemark_tb
	private int courseMarkNum;
	private int loginNum;
	
//	course_tb
	private int courseNum;
	private String name;
	private String content;
	private String who;
	private String during;
	private String how;
	
//	courseplace_tb
	private int contentId;
	
//	place_tb
	private String title;
	private String firstImage;
	private String addr1;
	
}
