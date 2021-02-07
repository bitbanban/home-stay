package com.bitcamp.korea_tour.model.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.bitcamp.korea_tour.model.AdminDto;

public interface AdminService {
	void insertAdmin(AdminDto adminDto);
	List<AdminDto> getAllAdmin();
	AdminDto getAdminData(@Param(value="id")String id, @Param(value="password")String password);
	void deleteAdmin(int adminNum);
	int checkAdmin(@Param(value="id")String id, @Param(value="password")String password);
	AdminDto getAdminDataByNum(int adminNum);
}
