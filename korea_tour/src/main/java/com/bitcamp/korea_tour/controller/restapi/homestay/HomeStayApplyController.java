package com.bitcamp.korea_tour.controller.restapi.homestay;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.korea_tour.model.UserDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayDetailDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayDto;
import com.bitcamp.korea_tour.model.homestay.JoinHomeStayDetailDto;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayHostService;
import com.bitcamp.korea_tour.model.service.login.setting.SessionNames;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class HomeStayApplyController implements SessionNames{
	private final HomeStayHostService hsas;
	
	/**
	 * 호스트 신청하기
	 * @param dto
	 * @param request
	 */
	@PostMapping("/homestays/house")
	public void insertApply(@RequestBody JoinHomeStayDetailDto dto,
			HttpServletRequest request
				) {
		int userNum=dto.getUserNum();
		hsas.insertHomeStay(dto);
		int homeStayNum = hsas.getHomeStayNum2(userNum);
		hsas.insertHomeStayDetail(homeStayNum, dto);
	}
}
