package com.bitcamp.korea_tour.controller.restapi.common;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.korea_tour.model.UserDto;
import com.bitcamp.korea_tour.model.service.UserService;
import com.bitcamp.korea_tour.model.service.login.setting.SessionNames;
import com.bitcamp.korea_tour.model.service.login.setting.SnsLoginType;
import com.bitcamp.korea_tour.model.service.login.user.OauthResReq;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin 
@RequiredArgsConstructor
@RequestMapping(value="/login")
@Slf4j
public class LoginController implements SessionNames {

	private final OauthResReq oauthResReq;
	private final UserService userService;
	private final HttpServletResponse response;

	/**
	 * 사용자로부터 SNS 로그인 요청을 SnsLoginType 을 받아 처리
	 * @param snsLoginType (GOOGLE, FACEBOOK, NAVER, KAKAO)
	 */
	@GetMapping(value = "/{snsLoginType}")
	public void snsLoginType(
			@PathVariable(name = "snsLoginType") SnsLoginType snsLoginType) {
		log.info(">> 사용자로부터 SNS 로그인 요청을 받음 :: {} Social Login", snsLoginType);
		oauthResReq.request(snsLoginType);
	}

	/**
	 *Social Login API Server 요청에 의한 callback 을 처리
	 * @param socialLoginType (GOOGLE, NAVER, KAKAO)
	 * @param code API Server 로부터 넘어오는 code
	 * @return SNS Login 요청 결과로 받은 Json 형태의 String 문자열 (access_token, refresh_token 등)
	 */
	@GetMapping(value = "/{snsLoginType}/callback")
	public void callback(
			@PathVariable(name = "snsLoginType") SnsLoginType snsLoginType, @RequestParam(name = "code") String code, HttpServletRequest request) {

		String jsonData=oauthResReq.requestAccessToken(snsLoginType, code);
		UserDto userDto=oauthResReq.getUserInfo(snsLoginType, jsonData);
		String sns=snsLoginType.toString();

		log.info(">> 소셜 로그인 API 서버로부터 받은 code :: {}", code);

		if(snsLoginType.equals(SnsLoginType.KAKAO)) {
			String kakaoKey=userDto.getKakaoKey();
			doSnsLogin(sns, kakaoKey, userDto, request);
		}else if(snsLoginType.equals(SnsLoginType.NAVER)) {
			String naverKey=userDto.getNaverKey();
			doSnsLogin(sns, naverKey, userDto, request);
		}else if(snsLoginType.equals(SnsLoginType.GOOGLE)) {
			String googleKey=userDto.getGoogleKey();
			doSnsLogin(sns, googleKey, userDto, request);
		}

		//로그인완료시 메인페이지 이동
		try {
			response.sendRedirect("/");
		} catch (IOException e) {
			e.printStackTrace();
		}

		//로그인 정보 세션에서 확인
		HttpSession session=request.getSession();
		session.setMaxInactiveInterval(24*60*60);
		UserDto user=(UserDto)session.getAttribute(USER);
		log.info(">> 로그인 사용자 정보 :: loginNum:{},loginId:{},loginPhoto:{}", user.getUserNum(),user.getName(),user.getPhoto());
		if(user.getKakaoKey()!=null) log.info(">> 로그인 사용자 소셜 정보 :: 카카오_"+user.getKakaoKey());
		else if(user.getNaverKey()!=null) log.info(">> 로그인 사용자 소셜 정보 :: 네이버_"+user.getNaverKey());
		else if(user.getGoogleKey()!=null) log.info(">> 로그인 사용자  소셜 정보 :: 구글 _"+user.getGoogleKey());
	}		

	
	//최초 로그인일 경우 받아온 정보 db에 저장, 세션에 실어주기
	//기존 사용자일 경우 기존 db데이터 세션에 실어주기
	public void doSnsLogin(String sns, String key, UserDto userDto, HttpServletRequest request) {
		if(!userService.hasKey(sns, key)) {
			userService.insertUser(userDto);
			userService.setSession(userDto, request);
		}else {
			UserDto userByKey=userService.getUserByKey(sns, key);
			userService.setSession(userByKey, request);
		}
	}



}