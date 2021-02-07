package com.bitcamp.korea_tour.controller.restapi.homestay;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.korea_tour.model.homestay.HomeStayReservationDto;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayHostService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class HomeStayReservationDetailController {
	private final HomeStayHostService hhs;
	
	/**
	 * 예약 디테일 출력
	 * @param homeStayReservationNum
	 * @return
	 */
	@GetMapping("/homestay/reservation/{homeStayReservationNum}")
	@ResponseBody
	public JsonData getReservationDetail(
			@PathVariable(name="homeStayReservationNum") int homeStayReservationNum
			) {
		HomeStayReservationDto dto = hhs.getReservation(homeStayReservationNum);
		
		return new JsonData(dto);
	}
	
   @Data
   @AllArgsConstructor
   static class JsonData {
      private HomeStayReservationDto detail;
   }	
}
