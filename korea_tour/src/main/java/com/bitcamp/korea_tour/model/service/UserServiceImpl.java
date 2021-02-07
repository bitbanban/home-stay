package com.bitcamp.korea_tour.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.UserDto;
import com.bitcamp.korea_tour.model.mapper.UserMapper;
import com.bitcamp.korea_tour.model.service.login.setting.SessionNames;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService,SessionNames {
	
	private final UserMapper mapper;
	
	@Override
	public List<UserDto> getUserList(int start, int perPage) {
		Map<String, Integer> map=new HashMap<String, Integer>();
		map.put("start", start);
		map.put("perPage", perPage);
		return mapper.getUserList(map);
	}
	
	@Override
	public int getUserTotalCount() {
		return mapper.getUserTotalCount();
	}

	@Override
	public void insertUser(UserDto dto) {
		mapper.insertUser(dto);
	}

	@Override
	public UserDto getUserData(int userNum) {
		return mapper.getUserData(userNum);
	}

	@Override
	public void deleteUser(int loginNum) {
		mapper.deleteUser(loginNum);
	}

	
	@Override
	public boolean hasKey(String sns, String key) {
		Map<String, String> map=new HashMap<String, String>();
		map.put("sns", sns);
		map.put("key", key);
		System.out.println(mapper.hasKey(map));
		if(mapper.hasKey(map)!=0) return true;
		
		return false;
	}
	
	//세션에 실어둘 사용자 dto
	public UserDto getUserByKey(String sns, String key) {
		Map<String, String> map=new HashMap<String, String>();
		map.put("sns", sns);
		map.put("key", key);
		UserDto userDto=mapper.getUserByKey(map);
		return userDto;
	}
	
	@Override
	public void setSession(UserDto dto, HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.setAttribute(USER, dto);
	}

	@Override
	public void deleteUserByAdmin(int userNum) {
		mapper.deleteUserByAdmin(userNum);
	}

	@Override
	public int ifHost(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.ifHost(loginNum);
	}
	
	
	
}