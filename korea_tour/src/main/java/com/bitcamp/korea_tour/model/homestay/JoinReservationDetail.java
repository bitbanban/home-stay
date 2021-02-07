package com.bitcamp.korea_tour.model.homestay;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("joinreservationdetail")
public class JoinReservationDetail {	//홈스테이 예약상세에서 예약자 정보
	private int homeStayReservationNum;	//예약고유값
	private String customName;	//예약자 이름
	private String email1;	// 예약자 이메일1
	private String email2;	// 예약자 이메일2
	private Date writeday;	// 예약날짜
	private Date checkInDay;	// 예약자 체크인날
	private Date checkOutDay;	// 예약자 체크아웃날
	private int numberOfPeople;	// 인원수	
	private int totalPrice;	// 총가격
	private int approval;	// 승인여부 0:대기, 1:호스트가거절, 2:승인
	private int deleted;	// 예약자취소여부 0:대기 1:예약자가취소
}
