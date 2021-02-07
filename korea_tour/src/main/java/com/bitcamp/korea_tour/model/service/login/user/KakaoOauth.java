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
public class KakaoOauth implements OauthService{
	private final String KAKAO_SNS_HOST_URL="https://kauth.kakao.com/oauth/authorize";
	private final String KAKAO_SNS_BASE_URL="https://kapi.kakao.com/v2/user/me";
	private final String KAKAO_SNS_CLIENT_ID="5d2136e7d58ec45f7275dcd5dd09cf7c";
	private final String KAKAO_SNS_CLIENT_SECRET="jeYn5R9K3CFHZDYqmdryIDdGpJQ8Cp9w";
	private final String KAKAO_SNS_CALLBACK_URL="http://localhost:9003/login/kakao/callback";
	private final String KAKAO_SNS_TOKEN_BASE_URL="https://kauth.kakao.com/oauth/token";
	
	
	@Override
	public String getOauthRedirectURL() {
		Map<String, Object> params=new HashMap<>();
		params.put("response_type", "code");
		params.put("client_id", KAKAO_SNS_CLIENT_ID);
		params.put("redirect_uri", KAKAO_SNS_CALLBACK_URL);

		String parameterString=params.entrySet().stream()
				.map(x -> x.getKey()+"="+x.getValue())
				.collect(Collectors.joining("&"));

		return KAKAO_SNS_HOST_URL+"?"+parameterString;
	}

	@Override
	public String requestAccessToken(String code) {
		
		final List<NameValuePair> postParams = new ArrayList<>();

		postParams.add(new BasicNameValuePair("grant_type", "authorization_code"));
		postParams.add(new BasicNameValuePair("client_id", KAKAO_SNS_CLIENT_ID)); // REST API KEY
		postParams.add(new BasicNameValuePair("redirect_uri", KAKAO_SNS_CALLBACK_URL)); // 리다이렉트 URI
		postParams.add(new BasicNameValuePair("code", code)); // 로그인 과정중 얻은 code 값
		postParams.add(new BasicNameValuePair("client_secret", KAKAO_SNS_CLIENT_SECRET));
		
		final HttpClient client = HttpClientBuilder.create().build();
		System.out.println(client);
		final HttpPost post = new HttpPost(KAKAO_SNS_TOKEN_BASE_URL);
		System.out.println(post);
		JsonNode returnNode = null;
		

			try {
				post.setEntity(new UrlEncodedFormEntity(postParams));
				final HttpResponse response = client.execute(post);
				final int responseCode = response.getStatusLine().getStatusCode();
				
				System.out.println("\nSending 'POST' request to URL : " + KAKAO_SNS_TOKEN_BASE_URL);
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
	        final HttpPost post = new HttpPost(KAKAO_SNS_BASE_URL);
	 
	        // add header
	        post.addHeader("Authorization", "Bearer " + accessToken);
	 
	        JsonNode userInfo = null;
	 
	        try {
	            final HttpResponse response = client.execute(post);
	            final int responseCode = response.getStatusLine().getStatusCode();
	 
	            System.out.println("\nSending 'POST' request to URL : " + KAKAO_SNS_BASE_URL);
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
	        
	        userDto.setName(userInfo.path("properties").path("nickname").asText());
	        userDto.setPhoto(userInfo.path("properties").path("profile_image").asText());
	        userDto.setKakaoKey(userInfo.path("id").asText());
	        userDto.setNaverKey(null);
			userDto.setGoogleKey(null);
		
		return userDto;
		
	}
}