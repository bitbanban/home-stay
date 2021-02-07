package com.bitcamp.korea_tour.model.service.login.user;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.stereotype.Component;

import com.bitcamp.korea_tour.model.UserDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class NaverOauth implements OauthService {
	
	private final String NAVER_SNS_HOST_URL="https://nid.naver.com/oauth2.0/authorize";
	private final String NAVER_SNS_BASE_URL="https://openapi.naver.com/v1/nid/me";
	private final String NAVER_SNS_TOKEN_BASE_URL="https://nid.naver.com/oauth2.0/token";
	private final String NAVER_SNS_CLIENT_ID="XsYIxoQxXx7dgXFoawSE";
	private final String NAVER_SNS_CLIENT_SECRET="wrKclTiM_B";
	private final String NAVER_SNS_CALLBACK_URL="http://localhost:9003/login/naver/callback";
	
	
	@Override
	public String getOauthRedirectURL() {
		Map<String, Object> params=new HashMap<>();
		params.put("response_type", "code");
		params.put("client_id", NAVER_SNS_CLIENT_ID);
		params.put("redirect_uri", NAVER_SNS_CALLBACK_URL);
		params.put("state", "NAVER_STATE");
		

		String parameterString=params.entrySet().stream()
				.map(x -> x.getKey()+"="+x.getValue())
				.collect(Collectors.joining("&"));

		return NAVER_SNS_HOST_URL+"?"+parameterString;
	}

	@Override
	public String requestAccessToken(String code) {
		
		final List<NameValuePair> postParams = new ArrayList<>();

		postParams.add(new BasicNameValuePair("grant_type", "authorization_code"));
		postParams.add(new BasicNameValuePair("client_id", NAVER_SNS_CLIENT_ID)); // REST API KEY
		postParams.add(new BasicNameValuePair("client_secret", NAVER_SNS_CLIENT_SECRET));
		postParams.add(new BasicNameValuePair("redirect_uri", NAVER_SNS_CALLBACK_URL)); // 리다이렉트 URI
		postParams.add(new BasicNameValuePair("code", code)); // 로그인 과정중 얻은 code 값
		postParams.add(new BasicNameValuePair("state", "NAVER_STATE")); // 로그인 과정중 얻은 state 값(일단 임의로 넣어주기)
		
		final HttpClient client = HttpClientBuilder.create().build();
		System.out.println(client);
		final HttpPost post = new HttpPost(NAVER_SNS_TOKEN_BASE_URL);
		System.out.println(post);
		JsonNode returnNode = null;
		

			try {
				post.setEntity(new UrlEncodedFormEntity(postParams));
				final HttpResponse response = client.execute(post);
				final int responseCode = response.getStatusLine().getStatusCode();
				
				System.out.println("\nSending 'POST' request to URL : " + NAVER_SNS_TOKEN_BASE_URL);
				System.out.println("Post parameters : " + postParams);
				System.out.println("Response Code : " + responseCode);
				
				ObjectMapper mapper = new ObjectMapper();
				returnNode = mapper.readTree(response.getEntity().getContent());
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			} catch (ClientProtocolException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			String accessToken= returnNode.path("access_token").asText();
			
			
		return accessToken;
		
	}
	
	@Override
	public UserDto getUserInfo(String accessToken) {
		
		UserDto userDto = new UserDto();
		
			final HttpClient client = HttpClientBuilder.create().build();
	        final HttpPost post = new HttpPost(NAVER_SNS_BASE_URL);
	 
	        // add header
	        post.addHeader("Authorization", "Bearer " + accessToken);
	 
	        JsonNode userInfo = null;
	 
	        try {
	            final HttpResponse response = client.execute(post);
	            final int responseCode = response.getStatusLine().getStatusCode();
	 
	            System.out.println("\nSending 'POST' request to URL : " + NAVER_SNS_BASE_URL);
	            System.out.println("Response Code : " + responseCode);
	 
	            // JSON 형태 반환값 처리
	            ObjectMapper mapper = new ObjectMapper();
	            userInfo = mapper.readTree(response.getEntity().getContent());          
	            
	        } catch (ClientProtocolException e) {
	            e.printStackTrace();
	        } catch (IOException e) {
	            e.printStackTrace();
	        } finally {
	            // clear resources
	        }
	        System.out.println(userInfo.path("response").path("name").asText());
	        userDto.setName(userInfo.path("response").path("name").asText());
	        userDto.setPhoto(userInfo.path("response").path("profile_image").asText());
	        userDto.setNaverKey(userInfo.path("response").path("id").asText());
	        userDto.setKakaoKey(null);
			userDto.setGoogleKey(null);
		
		return userDto;
	}
}
