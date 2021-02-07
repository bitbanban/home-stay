package com.bitcamp.korea_tour.model.service.login.setting;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;

@Configuration
public class SnsLoginTypeConverter implements Converter<String, SnsLoginType> {
	@Override
	public SnsLoginType convert(String source) {
		return SnsLoginType.valueOf(source.toUpperCase());
	}
}
