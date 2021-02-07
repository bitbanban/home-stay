package com.bitcamp.korea_tour.controller.restapi.common;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.korea_tour.model.UserDto;
import com.bitcamp.korea_tour.model.service.UserService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class HomeStayLoginController {
	
	private final UserService userService;
	
	/**
	 * 사용자 api정보 DB체크 후 없으면 insert
	 * @param map
	 * @return userNum, host인지 여부(Y/N)
	 */
	@PostMapping(value="/homestays/signin", produces = "application/json; charset=UTF8")
	public JsonData checkUser(@RequestBody Map<String, Object> map) {
		
		String sns=map.get("type").toString();
		String key=map.get("id").toString();
		String name=map.get("name").toString();
		String photo=map.get("img").toString();
		
		//받아온 사용자 정보가 DB에 있는지 확인 후 없으면 insert
		UserDto userDto=new UserDto();
		userDto.setName(name);
		userDto.setPhoto(photo);
		
		if(sns.equals("KAKAO")) {
			userDto.setKakaoKey(key);
		}else if(sns.equals("NAVER")) {
			userDto.setNaverKey(key);
		}else if(sns.equals("GOOGLE")) {
			userDto.setGoogleKey(key);
		}
		
		if(!userService.hasKey(sns, key)) {
			userService.insertUser(userDto);
		}
		
		//DB 사용자정보
		UserDto user=userService.getUserByKey(sns, key);
		
		int userNum=user.getUserNum();
		String host=null;
		//호스트인지 여부
		if(userService.ifHost(userNum)==1) host="Y";
		else host="N";
		
		return new JsonData(userNum, host);
	}
	
	@Data
	@AllArgsConstructor
	static class JsonData {
		private int userNum;
		private String host;
	}
}
