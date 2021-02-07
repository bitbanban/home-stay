package com.bitcamp.korea_tour.controller.restapi.homestay;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.korea_tour.model.homestay.HomeStayReservationDto;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayHostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class HomeStayReservationApprovalController {
	private final HomeStayHostService hhs;
	
	/*
	 * @PatchMapping("/homestays/reservation/{homeStayReservationNum}/{approval}")
	 * public void ApprovalReservation(
	 * 
	 * @PathVariable(value="homeStayReservationNum")int homeStayReservationNum,
	 * 
	 * @PathVariable(value="approval") int approval
	 * 
	 * ) {
	 * 
	 * hhs.updateApproval(homeStayReservationNum,approval); }
	 */
}
