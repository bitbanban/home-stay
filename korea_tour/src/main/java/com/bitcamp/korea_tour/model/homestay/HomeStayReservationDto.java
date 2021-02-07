package com.bitcamp.korea_tour.model.homestay;

import java.sql.Date;
import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("homestayreservation")
public class HomeStayReservationDto {
	private int homeStayReservationNum;	//예약 고유값
	private int userNum;	//호스트 userNum
	private int loginNum;	//예약한 유저의 userNum
	private int homeStayNum;	//홈스테이 고유값
	private Date checkInDay;	//체크인 날짜
	private Date checkOutDay;	//체크아웃날짜
	private int numberOfPeople;	//총인원수
	private int totalPrice;	//총가격
	private int approval;	//0: 예약대기, 1: 예약취소(by host), 2: 예약승인
	private Date writeday; // 예약한 날짜
	private String name;	// 예약자 이름
	private String email1;	// email
	private String email2;	// 도메인주소
	private String gender;	// 예약자 성별
	private String birthYear;	//예약자 생년
	private String birthMonth;	//예약자 생월
	private String birthDay;	//예약자 생일
	private int deleted;	//1: 예약자가취소했을때, 0: 아직 취소안함 
}
