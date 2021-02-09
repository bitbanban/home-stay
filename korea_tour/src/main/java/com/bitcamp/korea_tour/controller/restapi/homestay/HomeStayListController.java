package com.bitcamp.korea_tour.controller.restapi.homestay;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.korea_tour.model.UserDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayListDto;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayListService;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayService;
import com.bitcamp.korea_tour.model.service.login.setting.SessionNames;
import com.bitcamp.korea_tour.model.service.paging.PagingService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/homestays")
public class HomeStayListController implements SessionNames {
	private final HomeStayListService homeStayListService;
	private final HomeStayService homeStayService;
	private final PagingService pagingService;
	
	List<HomeStayListDto> list=new ArrayList<HomeStayListDto>();
	int start=0;
	int perPage=6;
	int totalPage=0;
	int totalCount=0;
	
	String photoName=null;
	int isMarked=0;
	int countOfReview=0;
	Double avgOfStar=0.0;
	
	/**
	 * 홈스테이 집목록(최저가순)
	 * @param currentPage
	 * @param request
	 * @return Json(list)
	 */
	@PostMapping(value="/price/{currentPage}", produces = "application/json;charset=utf8")
	public JsonList<List<HomeStayListDto>> getHomeStayListByPrice (
			@PathVariable(value="currentPage") int currentPage,
			@RequestBody Map<String, Object> json
			) {
		
		Map<String, Object> map=new HashMap<String, Object>();
		start=pagingService.getPagingStart(currentPage, perPage);
		String keyword=json.get("keyword").toString();
		Integer maxPeople=Integer.parseInt(json.get("maxPeople").toString());
		String checkInDay=json.get("checkInDay").toString();
		String checkOutDay=json.get("checkOutDay").toString();
		Integer loginNum=Integer.parseInt(json.get("userNum").toString());
		map.put("start", start);
		map.put("perPage", perPage);
		map.put("keyword", keyword);
		map.put("maxPeople", maxPeople);
		map.put("checkInDay", checkInDay);
		map.put("checkOutDay", checkOutDay);
		list=homeStayListService.getAllHomeStayList(map);
		
		for(HomeStayListDto dto:list) {
			int homeStayNum=dto.getHomeStayNum();
			
			photoName=homeStayListService.getHomeStayPhotoOfList(homeStayNum);
			if(loginNum!=null) isMarked=homeStayListService.isMarked(homeStayNum, loginNum);
			
			countOfReview=homeStayService.countOfHouseAnswer(homeStayNum);
			if(countOfReview==0) avgOfStar=0.0;
			else avgOfStar=homeStayListService.getAvgOfStar(homeStayNum);
			
			dto.setPhotoName(photoName);
			dto.setIsMarked(isMarked);
			dto.setCountOfReview(countOfReview);
			dto.setAvgOfStar(avgOfStar);
		}
		
		return new JsonList<List<HomeStayListDto>>(list);
	}
	
	/**
	 * 홈스테이 집목록(평점높은순)
	 * @param currentPage
	 * @param request
	 * @return
	 */
	@PostMapping(value="/review/{currentPage}", produces = "application/json;charset=utf8")
	public JsonList<List<HomeStayListDto>> getHomeStayListByReview (
			@PathVariable(value="currentPage") int currentPage,
			@RequestBody Map<String, Object> json
			) {
		
		Map<String, Object> map=new HashMap<String, Object>();
		start=pagingService.getPagingStart(currentPage, perPage);
		String keyword=json.get("keyword").toString();
		Integer maxPeople=Integer.parseInt(json.get("maxPeople").toString());
		String checkInDay=json.get("checkInDay").toString();
		String checkOutDay=json.get("checkOutDay").toString();
		Integer loginNum=Integer.parseInt(json.get("userNum").toString());
		map.put("start", start);
		map.put("perPage", perPage);
		map.put("keyword", keyword);
		map.put("maxPeople", maxPeople);
		map.put("checkInDay", checkInDay);
		map.put("checkOutDay", checkOutDay);
		list=homeStayListService.getAllHomeStayList(map);
		
		for(HomeStayListDto dto:list) {
			int homeStayNum=dto.getHomeStayNum();
			
			photoName=homeStayListService.getHomeStayPhotoOfList(homeStayNum);
			if(loginNum!=null) isMarked=homeStayListService.isMarked(homeStayNum, loginNum);
			
			countOfReview=homeStayService.countOfHouseAnswer(homeStayNum);
			if(countOfReview==0) avgOfStar=0.0;
			else avgOfStar=homeStayListService.getAvgOfStar(homeStayNum);
			
			dto.setPhotoName(photoName);
			dto.setIsMarked(isMarked);
			dto.setCountOfReview(countOfReview);
			dto.setAvgOfStar(avgOfStar);
		}
		
		list.sort(new Comparator<HomeStayListDto>() {
			@Override
			public int compare(HomeStayListDto dto0, HomeStayListDto dto1) {
				double avgOfStar0=0.0;
				double avgOfStar1=0.0;
				
				if(dto0.getAvgOfStar()!=null) avgOfStar0=dto0.getAvgOfStar();
				if(dto1.getAvgOfStar()!=null) avgOfStar1=dto1.getAvgOfStar();
				
				if(avgOfStar0==avgOfStar1) return 0;
				else if(avgOfStar0<avgOfStar1) return 1;
				else return -1;
			}
		});
		
		return new JsonList<List<HomeStayListDto>>(list);
	}
	
	
//	/**
//	 * 홈스테이 집목록 토탈페이지
//	 * @return int
//	 */
//	@GetMapping("/paging/homestay-list")
//	public int getTotalPage() {
//		totalCount=homeStayListService.getTotalHomeStayList();
//		return pagingService.getPagingTotalPage(totalCount, perPage);
//	}
	
	
	@Data
	@AllArgsConstructor
	static class JsonList<T> {
		private T list;
	}
	

}
