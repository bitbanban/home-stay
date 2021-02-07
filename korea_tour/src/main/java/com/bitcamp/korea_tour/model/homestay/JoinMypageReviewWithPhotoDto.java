package com.bitcamp.korea_tour.model.homestay;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("joinmypagedonereservation")
public class JoinMypageReviewWithPhotoDto {
	private int homeStayReservationNum; // 예약고유값
	private int hostNum;				// 호스트 userNum
	private int homeStayNum;			// 홈스테이 고유값
	private String homeStayTitle;		// 홈스테이 이름
	private String homeStayPhoto;		// 홈스테이 대표사진
	private int customerNum;			// 예약자 userNum
	private Date checkInDay;			// 체크인날
	private Date checkOutDay;			// 체크아웃날
	private int reviewWrite;			// 리뷰작성여부 0:아직안씀, 1:이미씀
}
