package com.bitcamp.korea_tour.model.homestay;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("homestaydetail")
public class HomeStayDetailDto {
	private int homeStayDetailNum;
	private int homeStayNum;
	private int userNum;
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
