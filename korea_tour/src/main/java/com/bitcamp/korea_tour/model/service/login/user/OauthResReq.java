package com.bitcamp.korea_tour.model.service.login.user;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.UserDto;
import com.bitcamp.korea_tour.model.service.login.setting.SnsLoginType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OauthResReq{
	
	private final List<OauthService> oauthServiceList;
	private final HttpServletResponse response;
	
	//redirect uri로 코드 요청
	public void request(SnsLoginType snsLoginType) {
		//snsLoginType에 맞는 OauthService 객체로 초기화
		OauthService oauthService = this.findOauthByType(snsLoginType);
		
		String redirectURL=oauthService.getOauthRedirectURL();
		
		try {
			response.sendRedirect(redirectURL);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	//받아온 코드로 토큰 요청
	public String requestAccessToken(SnsLoginType snsLoginType, String code) {
		//snsLoginType에 맞는 OauthService 객체로 초기화
		OauthService oauthService=this.findOauthByType(snsLoginType);
		
		return oauthService.requestAccessToken(code);
	}
	
	//토큰(jsonData)으로 요청하여 받아온 사용자 정보(json) dto에 넣어주기
	public UserDto getUserInfo(SnsLoginType snsLoginType, String jsonData) {
		//snsLoginType에 맞는 OauthService 객체로 초기화
		OauthService oauthService=this.findOauthByType(snsLoginType);
		
		return oauthService.getUserInfo(jsonData);
	}
	
	//snsLoginType에 맞는 OauthService 객체를 반환하는 함수
	public OauthService findOauthByType(SnsLoginType snsLoginType) {
		return oauthServiceList.stream()
				.filter(x -> x.type()==snsLoginType)
				.findFirst()
				.orElseThrow(() -> new IllegalArgumentException("알 수 없는 소셜 로그인 형식"));
	}
}