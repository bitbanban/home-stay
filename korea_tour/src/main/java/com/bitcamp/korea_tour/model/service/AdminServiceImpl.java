package com.bitcamp.korea_tour.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.AdminDto;
import com.bitcamp.korea_tour.model.mapper.AdminMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
	private final AdminMapper adminMapper;
	
	@Override
	public void insertAdmin(AdminDto adminDto) {
		adminMapper.insertAdmin(adminDto);
	}
	
	@Override
	public List<AdminDto> getAllAdmin() {
		return adminMapper.getAllAdmin();
	}
	
	@Override
	public void deleteAdmin(int adminNum) {
		adminMapper.deleteAdmin(adminNum);
	}
	
	@Override
	public int checkAdmin(@Param(value="id")String id, @Param(value="password")String password) {
		Map<String, String> map=new HashMap<String, String>();
		map.put("id", id);
		map.put("password", password);
		return adminMapper.checkAdmin(map);
	}
	
	@Override
	public AdminDto getAdminData(@Param(value="id")String id, @Param(value="password")String password) {
		Map<String, String> map=new HashMap<String, String>();
		map.put("id", id);
		map.put("password", password);
		return adminMapper.getAdminData(map);
	}

	@Override
	public AdminDto getAdminDataByNum(int adminNum) {
		return adminMapper.getAdminDataByNum(adminNum);
	}
	
}
