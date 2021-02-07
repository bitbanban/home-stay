
package com.bitcamp.korea_tour.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.UserDto;

@Mapper
public interface UserMapper {
	int getTotalCount();
	List<UserDto> getUserList(Map<String, Integer> paging);
	int getUserTotalCount();
	void insertUser(UserDto dto);
	UserDto getUserData(int userNum);
	void deleteUser(int loginNum);
	int hasKey(Map<String, String> map);
	UserDto getUserByKey(Map<String, String> map);
	void deleteUserByAdmin(int userNum);
	int ifHost(int loginNum);
}