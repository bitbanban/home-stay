package com.bitcamp.korea_tour.model.homestay;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("homestaylist")
public class HomeStayListDto {

	private int homeStayNum;
	private String title;
	private String addr1;
	private int price;
	private String photoName;
	private int isMarked;
	private int countOfReview;
	private Double avgOfStar;

}