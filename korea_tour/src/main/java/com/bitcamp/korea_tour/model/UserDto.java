package com.bitcamp.korea_tour.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("user")
public class UserDto {
	private int userNum;
	private String name;
	private String photo;
	private String kakaoKey;
	private String googleKey;
	private String naverKey;
}
