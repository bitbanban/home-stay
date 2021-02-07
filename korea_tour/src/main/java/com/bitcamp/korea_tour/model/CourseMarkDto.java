package com.bitcamp.korea_tour.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("coursemark")
public class CourseMarkDto {
	private int courseMarkNum;
	private int userNum;
	private int courseNum;
	private int loginNum;
}
