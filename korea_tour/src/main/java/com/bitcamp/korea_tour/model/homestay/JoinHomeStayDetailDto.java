package com.bitcamp.korea_tour.model.homestay;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("joinhomestaydetail")
public class JoinHomeStayDetailDto {
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
	private String xpos;
	private String ypos;
	private int price;
	private int open;
	
	private int homeStayDetailNum;
	private int dogOk;
	private int smokingOk;
	private int maxPeople;
	private String email1;
	private String email2;
	private String hp;
	private int wifi;
	private int towel;
	private int breakfast;
	private int aircon;
	private int elecProduct;
	private int kitchen;
	private int bathroom;
	private int parking;
}
