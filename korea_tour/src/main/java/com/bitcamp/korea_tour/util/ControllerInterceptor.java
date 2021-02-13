package com.bitcamp.korea_tour.util;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ControllerInterceptor implements WebMvcConfigurer {
	
	private final UserAuthInterceptor userInterceptor;
	private final UserGetAuthInterceptor userGetInterceptor;
	private final AdminAuthInterceptor adminInterceptor;
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(userInterceptor)
				.addPathPatterns("/tourmypage/**")
				.addPathPatterns("/placeanswer")
				.addPathPatterns("/api/place/detail/course/**")
				.addPathPatterns("/api/place/detail/photo")
				.addPathPatterns("/api/tourmypage/**")
				.addPathPatterns("/api/courses")
				.addPathPatterns("/api/courses/**")
				.addPathPatterns("/api/courseplace/**")
				.addPathPatterns("/api/courseplaces")
				.addPathPatterns("/api/mypage/**")
				.addPathPatterns("/api/placeanswer")
				.addPathPatterns("/api/placereanswer")
				.addPathPatterns("/api/courseanswer")
				.addPathPatterns("/api/coursereanswer")
				;
		
		registry.addInterceptor(adminInterceptor)
				.addPathPatterns("/admin")
				.addPathPatterns("/admin/**")
				.addPathPatterns("/api/admin/**")
				.addPathPatterns("/public/**");
		
		registry.addInterceptor(userGetInterceptor)
				.addPathPatterns("/tourmypage")
				.addPathPatterns("/tourmypage/**")
				.addPathPatterns("/api/place/detail/course/**")
				.addPathPatterns("/api/tourmypage/**")
				.addPathPatterns("/api/courses")
				.addPathPatterns("/api/mypage/**")
		;
	}
}
