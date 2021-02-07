package com.bitcamp.korea_tour.model.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.ui.Model;

import com.bitcamp.korea_tour.model.UserDto;

public interface UserService {
	
	List<UserDto> getUserList(int start, int perPage);
	int getUserTotalCount();
	UserDto getUserData(int userNum);
	void deleteUser(int loginNum);
	void insertUser(UserDto dto);
	boolean hasKey(String sns, String key);
	UserDto getUserByKey(String sns, String key);
	void setSession(UserDto dto,  HttpServletRequest request);
	void deleteUserByAdmin(int userNum);
	int ifHost(int loginNum);
}
