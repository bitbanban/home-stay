package com.bitcamp.korea_tour.model.homestay;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("homestay")
public class HomeStayDto {
	private int homeStayNum;
	private int userNum;
	private String title;
	private String addr1;
	private String addr2;
	private String content;
	private int approval;
	private String checkIn1;
	private String checkIn2;
	private String checkOut1;
	private String checkOut2;
	private int price;
	private int open;
	
	
}
