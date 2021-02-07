package com.bitcamp.korea_tour.model.homestay;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("homestaymark")
public class HomeStayMarkDto {
	private int homeStayMarkNum; //PK
	private int homeStayNum; //즐겨찾기 한 집 num
	private int userNum; //즐겨찾기한 집의 주인 num
	private int loginNum; //즐겨찾기를 누른 사람(현재로그인한사람)의 num
}
