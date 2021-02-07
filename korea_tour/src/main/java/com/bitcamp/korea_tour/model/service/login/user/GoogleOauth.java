package com.bitcamp.korea_tour.model.service.login.user;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.bitcamp.korea_tour.model.UserDto;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import lombok.RequiredArgsConstructor;
//https://accounts.google.com/o/oauth2/v2/auth?scope=profile&response_type=code&client_id=779685065070-lbrojg14lasf8j3g0gcapnctskou7pct.apps.googleusercontent.com&redirect_uri=http://localhost:9003/login/google/callback
@Component
@RequiredArgsConstructor
public class GoogleOauth implements OauthService {

	private final String GOOGLE_SNS_BASE_URL="https://accounts.google.com/o/oauth2/v2/auth";
	private final String GOOGLE_SNS_CLIENT_ID="779685065070-lbrojg14lasf8j3g0gcapnctskou7pct.apps.googleusercontent.com";
	private final String GOOGLE_SNS_CLIENT_SECRET="_WNRGmyeo5A6VsXxkOWSXJLx";
//	private final String GOOGLE_SNS_CLIENT_ID="848389228191-4bcd7bl1iil8fqnibinp1ff9j9a1pukk.apps.googleusercontent.com";
//	private final String GOOGLE_SNS_CLIENT_SECRET="7t6nDNV8BmDdSLAmIDiKh9x3";
	private final String GOOGLE_SNS_CALLBACK_URL="http://localhost:9003/login/google/callback";
	private final String GOOGLE_SNS_TOKEN_BASE_URL="https://oauth2.googleapis.com/token";

	@Override
	public String getOauthRedirectURL() {

		Map<String, Object> params=new HashMap<>();
		params.put("scope", "profile");
		params.put("response_type", "code");
		params.put("client_id", GOOGLE_SNS_CLIENT_ID);
		params.put("redirect_uri", GOOGLE_SNS_CALLBACK_URL);

		String parameterString=params.entrySet().stream()
				.map(x -> x.getKey()+"="+x.getValue())
				.collect(Collectors.joining("&"));

		return GOOGLE_SNS_BASE_URL+"?"+parameterString;
	}


	@Override
	public String requestAccessToken(String code) {
		RestTemplate restTemplate=new RestTemplate();

		Map<String, Object> params=new HashMap<>();
		params.put("code", code);
		params.put("client_id", GOOGLE_SNS_CLIENT_ID);
		params.put("client_secret", GOOGLE_SNS_CLIENT_SECRET);
		params.put("redirect_uri", GOOGLE_SNS_CALLBACK_URL);
		params.put("grant_type", "authorization_code");

		ResponseEntity<String> responseEntity=restTemplate.postForEntity(GOOGLE_SNS_TOKEN_BASE_URL, params, String.class);

		if(responseEntity.getStatusCode()==HttpStatus.OK) {
			return responseEntity.getBody();  //json 반환됨(받아와서 다시 id_token을 복호화해주어야 getInfo할수 있음)
		}
		return "구글 로그인 요청 처리 실패";
	}

	/**
	 * 사용자 정보 json 데이터로 얻어와서 dto에 넣어 반환
	 * @param jsonData (암호화된 jwt param) // 구글 account에서 REST API 통신을 하여 얻어온 JSON (accss_token,id_token .... )
	 * @return UserDto
	 */
	@Override
	public UserDto getUserInfo(String jsonData) {
		JsonParser jsonParser = new JsonParser();
		JsonElement parse = jsonParser.parse(jsonData);
		JsonObject asJsonObject = parse.getAsJsonObject();

		//받아온 json데이터의 id_token이 JWT이므로 복호화하여 사용한다.
		JWT jwt = new JWT();
		DecodedJWT decodeJwt = jwt.decodeJwt(asJsonObject.get("id_token").getAsString());

		UserDto userDto = new UserDto();
		userDto.setName(decodeJwt.getClaims().get("name").asString());
		userDto.setPhoto(decodeJwt.getClaims().get("picture").asString());
		userDto.setGoogleKey(decodeJwt.getClaims().get("sub").asString());
		userDto.setKakaoKey(null);
		userDto.setNaverKey(null);

		return userDto;

	}


}

