package com.bitcamp.korea_tour;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
public class KoreaTourApplication {

	public static final String APPLICATION_LOCATIONS = "spring.config.location="
            + "classpath:application.yml,"
            + "classpath:aws.yml";
	
	public static void main(String[] args) {
		new SpringApplicationBuilder(KoreaTourApplication.class)
        .properties(APPLICATION_LOCATIONS)
        .run(args);
//		SpringApplication.run(KoreaTourApplication.class, args);
	}

}
