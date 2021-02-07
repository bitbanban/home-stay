package com.bitcamp.korea_tour.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("course")
public class CourseDto {
	private int courseNum;
	private int userNum;
	private String name;
	private String content;
	private int open;
	private int share;
	private String who;
	private String during;
	private String how;
	private int totalLike;
}
