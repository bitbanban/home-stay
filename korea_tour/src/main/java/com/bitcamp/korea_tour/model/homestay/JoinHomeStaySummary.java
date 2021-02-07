package com.bitcamp.korea_tour.model.homestay;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("joinhomestaysummary")
public class JoinHomeStaySummary { //마이페이지 예약상세에서 홈스테이정보 요약 
	private int homeStayNum;	//홈스테이 고유값
	private String photoName;	//홈스테이 첫사진
	private String homeTitle;	//홈스테이 이름
	private String hostName;	//호스트이름
	private String addr1;	//홈스테이주소1
	private String addr2;	//홈스테이주소2
}
