package com.bitcamp.korea_tour.model;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("touranswer")
public class TourAnswerDto {
	private int tourAnswerNum;
	private int courseNum;
	private int userNum; //course 테이블
	private int contentId; //place 테이블
	private int loginNum;
	private String loginId;
	private String loginPhoto;
	private String content;
	private Date writeDay;
	private int relevel;
	private int regroup;
	private int deleted;
	private int restep;

}
