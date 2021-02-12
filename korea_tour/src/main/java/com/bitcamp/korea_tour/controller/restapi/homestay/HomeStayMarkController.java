package com.bitcamp.korea_tour.controller.restapi.homestay;

import java.util.HashMap;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.korea_tour.model.homestay.JoinHomeStayMarkDto;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayListService;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayMarkService;
import com.bitcamp.korea_tour.model.service.login.setting.SessionNames;
import com.bitcamp.korea_tour.model.service.paging.PagingService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/homestays")
public class HomeStayMarkController implements SessionNames {
	
	private final HomeStayMarkService homeStayMarkService;
	private final HomeStayListService homeStayListService;
	private final PagingService pagingService;
	
	@Data
	@AllArgsConstructor
	static class JsonMypageMarkList {
		private List<JoinHomeStayMarkDto> marks;
		private int totalCount;
	}
	
	@GetMapping("/mypage/marks/{loginNum}")
	public JsonMypageMarkList getMarkList(
			@PathVariable(name="loginNum") int loginNum
			) {
		int totalCount = homeStayMarkService.getTotalCountOfMarkByUser(loginNum);
		List<JoinHomeStayMarkDto> marks = homeStayMarkService.getMarkListByUser(loginNum);
		for(JoinHomeStayMarkDto mdto: marks) {
			int homeStayNum = mdto.getHomeStayNum();
			Double avgOfStars = homeStayListService.getAvgOfStar(homeStayNum);
			mdto.setAvgOfStars(avgOfStars);
		}
		
		return new JsonMypageMarkList(marks, totalCount);
	}
	
	
	
	//디테일에서 즐겨찾기 확인하기
	@GetMapping("/{homeStayNum}/mark")
	public int checkMyMark(
			@PathVariable(value = "homeStayNum")int homeStayNum,
			@RequestParam(value = "userNum") Integer userNum 		
							) {
		System.out.println("디테일즐겨찾기 로그인넘 : "+userNum);
		
		if(userNum!=null) return homeStayMarkService.countOfMyMark(homeStayNum, userNum);
		
		return 0;
		
	}
	
	/**
	 * 즐겨찾기 추가
	 * @param homeStayNum
	 * @param request
	 * @return String
	 */
	@PostMapping("/mark")
	public String insertMark(
			@RequestParam(value="homeStayNum") int homeStayNum,
			@RequestParam(value="userNum") Integer userNum
			) {
		
		if(userNum!=null) homeStayMarkService.insertMark(homeStayNum, userNum);
		
		return "즐겨찾기 추가 성공";
	}
	
	/**
	 * 즐겨찾기 취소
	 * @param homeStayNum
	 * @param request
	 * @return String
	 */
	@DeleteMapping("/mark")
	public String deleteMark(
			@RequestParam(value="homeStayNum") int homeStayNum,
			@RequestParam(value="userNum") Integer userNum
			) {
		
		if(userNum!=null) homeStayMarkService.deleteMark(homeStayNum, userNum);
		
		return "즐겨찾기 취소 성공";
	}
	
}
