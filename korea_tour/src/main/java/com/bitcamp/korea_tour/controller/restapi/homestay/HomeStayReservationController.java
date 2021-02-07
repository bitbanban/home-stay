package com.bitcamp.korea_tour.controller.restapi.homestay;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.korea_tour.model.homestay.HomeStayReservationDto;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayReservationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class HomeStayReservationController {
	private final HomeStayReservationService s;
	
	
	//예약하기
	@PostMapping("/homestays/{homeStayNum}/reservation/guestdata")
	public void insertMyReservation(@PathVariable(value = "homeStayNum")int homeStayNum,
									@ModelAttribute HomeStayReservationDto dto) {
		s.insertMyReservation(dto);
	}
	
	
	
	//////////////////////////////////////////////////////////
}
