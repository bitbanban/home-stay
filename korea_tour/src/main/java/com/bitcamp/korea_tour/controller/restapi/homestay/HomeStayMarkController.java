package com.bitcamp.korea_tour.controller.restapi.homestay;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.korea_tour.controller.restapi.tour.PlaceController;
import com.bitcamp.korea_tour.model.JoinPlaceListDto;
import com.bitcamp.korea_tour.model.UserDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayMarkDto;
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
		private int totalPage;
	}
	
	@GetMapping("/mypage/marks/{loginNum}/{currentPage}")
	public JsonMypageMarkList getMarkList(
			@PathVariable(name="loginNum") int loginNum,
			@PathVariable(name="currentPage") int currentPage
			) {
		int totalCount = homeStayMarkService.getTotalCountOfMarkByUser(loginNum);
		int start = pagingService.getPagingData(totalCount, currentPage).get("start");
		int perPage = pagingService.getPagingData(totalCount, currentPage).get("perPage");
		int totalPage = pagingService.getPagingData(totalCount, currentPage).get("totalPage");
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("start", start);
		map.put("perPage", perPage);
		map.put("loginNum", loginNum);
		List<JoinHomeStayMarkDto> marks = homeStayMarkService.getMarkListByUser(map);
		for(JoinHomeStayMarkDto mdto: marks) {
			int homeStayNum = mdto.getHomeStayNum();
			Double avgOfStars = homeStayListService.getAvgOfStar(homeStayNum);
			mdto.setAvgOfStars(avgOfStars);
		}
		System.out.println(marks);
		
		return new JsonMypageMarkList(marks, totalCount, totalPage);
	}
	
	
	
	//디테일에서 즐겨찾기 확인하기
	@GetMapping("/{homeStayNum}/mark")
	public int checkMyMark(@PathVariable(value = "homeStayNum")int homeStayNum,
							HttpServletRequest request) {
		HttpSession session=request.getSession();
		UserDto user=(UserDto)session.getAttribute(USER);
		int loginNum = user.getUserNum();
		
		System.out.println("디테일즐겨찾기 로그인넘 : "+loginNum);
		
		return homeStayMarkService.countOfMyMark(homeStayNum, loginNum);
		
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
			HttpServletRequest request
			) {
		
		HttpSession session=request.getSession();
		UserDto user=(UserDto)session.getAttribute(USER);
		if(user!=null) homeStayMarkService.insertMark(homeStayNum, user.getUserNum());
		
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
			HttpServletRequest request
			) {
		
		HttpSession session=request.getSession();
		UserDto user=(UserDto)session.getAttribute(USER);
		if(user!=null) homeStayMarkService.deleteMark(homeStayNum, user.getUserNum());
		
		return "즐겨찾기 취소 성공";
	}
	
}
