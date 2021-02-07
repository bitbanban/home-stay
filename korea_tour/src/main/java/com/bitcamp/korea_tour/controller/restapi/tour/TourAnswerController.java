package com.bitcamp.korea_tour.controller.restapi.tour;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.korea_tour.model.TourAnswerDto;
import com.bitcamp.korea_tour.model.service.TourAnswerService;
import com.bitcamp.korea_tour.model.service.login.setting.SessionNames;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TourAnswerController implements SessionNames{
	private final TourAnswerService tas;
	
	/**
	 * 코스 댓글 입력
	 * @param dto
	 */
	@PostMapping(value = "/courseanswer")
	public void insertCourseAnswer(@RequestBody TourAnswerDto dto) {
		tas.insertCourseAnswer(dto);
	}
	/**
	 * 코스 답글 입력
	 * @param dto
	 */
	@PostMapping(value = "/coursereanswer")
	public void insertCourseReAnswer(@RequestBody TourAnswerDto dto) {
		tas.insertCourseReAnswer(dto);
	}
	/**
	 * 관광지 댓글 입력
	 * @param dto
	 */

	@PostMapping(value = "/placeanswer")
	public void insertPlaceAnswer(@RequestBody TourAnswerDto dto) {
		tas.insertPlaceAnswer(dto);
	}
	/**
	 * 관광지 답글 입력
	 * @param dto
	 */
	@PostMapping(value = "/placereanswer")
	public void insertPlaceReAnswer(@RequestBody TourAnswerDto dto) {
		tas.insertPlaceReAnswer(dto);
	}


	@Data
	@AllArgsConstructor
	static class JsonAnswer<T>{

		private T answer;
		int totalPage;
	}

	@Data
	@AllArgsConstructor
	static class JsonReAnswer<T>{

		private T reAnswer;
		int totalPage;
	}

}