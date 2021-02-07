package com.bitcamp.korea_tour.controller.restapi.homestay;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.korea_tour.model.UserDto;
import com.bitcamp.korea_tour.model.service.UserService;
import com.bitcamp.korea_tour.model.service.login.setting.SessionNames;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class HomeStaySessionController implements SessionNames{
	private final UserService u;
	
	@Data
	@AllArgsConstructor
	static class JsonLogin{
		private int loginNum;
		private String loginId;
		private String loginPhoto;
		private int host;
		private String loginOk;
		
	}
	
	
	@GetMapping("api/homestays/loginInfomation")
	public JsonLogin homeStayLoginInfo(HttpServletRequest request, @ModelAttribute UserDto dto) {
		HttpSession session=request.getSession();
		UserDto user=(UserDto)session.getAttribute(USER);
		
		int loginNum = user.getUserNum(); 
		String loginId = user.getName(); 
		String loginPhoto = user.getPhoto();
		int host = u.ifHost(loginNum);
		String loginOk = "";
		
		if(loginId!=null) {
			loginOk = "loginOk";
		}
		
		return new JsonLogin(loginNum, loginId, loginPhoto, host, loginOk);
	}
}
