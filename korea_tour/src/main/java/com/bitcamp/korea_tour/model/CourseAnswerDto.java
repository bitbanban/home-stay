package com.bitcamp.korea_tour.model;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("courseanswer")
public class CourseAnswerDto {
	private int courseAnswerNum;
	private int userNum;
	private int courseNum;
	private String comment;
	private Timestamp writeday;
	private int relevel;
	private int regroup;
	private int loginNum;
	private String loginId;
	private String loginPhoto;
	private int deleted;
}
