package com.bitcamp.korea_tour.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("admin")
public class AdminDto {
	private int adminNum;
	private String id;
	private String password;
	private int level;
}
