package com.bitcamp.korea_tour.model.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.AdminDto;

@Mapper
public interface AdminMapper {
	void insertAdmin(AdminDto adminDto);
	List<AdminDto> getAllAdmin();
	AdminDto getAdminData(Map<String, String> map);
	void deleteAdmin(int adminNum);
	int checkAdmin(Map<String , String> map);
	AdminDto getAdminDataByNum(int adminNum);
}
