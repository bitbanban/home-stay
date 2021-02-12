package com.bitcamp.korea_tour.model.homestay;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("joinmark")
public class JoinHomeStayMarkDto {	// 마이페이지 즐겨찾기
	private int homeStayMarkNum;	// 즐겨찾기 고유값
	private int homeStayNum;		// 홈스테이 고유값
	private String title;			// 홈스테이 이름
	private int hostNum;			// 호스트 userNum
	private String hostName;		// 호스트 이름
	private String addr1;			// 홈스테이 addr1
	private String addr2;			// 홈스테이 addr2
	private Double avgOfStars;		// 별점 평균
	private String homeStayPhoto;	// 홈스테이 대표 사진
}
