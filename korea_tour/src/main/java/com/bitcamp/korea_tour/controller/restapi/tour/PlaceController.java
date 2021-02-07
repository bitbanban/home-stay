package com.bitcamp.korea_tour.controller.restapi.tour;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bitcamp.korea_tour.fileupload.SpringFileWriter;
//import com.bitcamp.korea_tour.fileupload.SpringFileWriter;
import com.bitcamp.korea_tour.model.CourseDto;
import com.bitcamp.korea_tour.model.JoinPlaceListDto;
import com.bitcamp.korea_tour.model.PlaceApiPhotoDto;
import com.bitcamp.korea_tour.model.PlaceDto;
import com.bitcamp.korea_tour.model.PlaceLikeDto;
import com.bitcamp.korea_tour.model.PlaceMarkDto;
import com.bitcamp.korea_tour.model.PlacePhotoDto;
import com.bitcamp.korea_tour.model.TourAnswerDto;
import com.bitcamp.korea_tour.model.UserDto;
import com.bitcamp.korea_tour.model.service.JoinPlaceService;
import com.bitcamp.korea_tour.model.service.PlaceLikeService;
import com.bitcamp.korea_tour.model.service.PlaceMarkService;
import com.bitcamp.korea_tour.model.service.PlacePhotoService;
import com.bitcamp.korea_tour.model.service.login.setting.SessionNames;
import com.bitcamp.korea_tour.model.service.paging.PagingService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PlaceController implements SessionNames{

	private final JoinPlaceService service;
	private final PlacePhotoService service2;
	private final PlaceLikeService service3;
	private final PlaceMarkService service4;
	private final PagingService pagingService;
	
	int totalCount = 0;
	int start = 0;
	int perPage = 10;
	
	@Data
	@AllArgsConstructor
	static class JsonPlaceMain<T> {
		private T place;
	}
	
	@Data
	@AllArgsConstructor
	static class JsonPlaceList {
		private List<JoinPlaceListDto> place;
		private int totalCount;
		private int totalPage;
	}
	
	@Data
	@AllArgsConstructor
	static class JsonPlaceDetail {
		private PlaceDto place;
		private List<PlaceApiPhotoDto> apiPhoto;
		private List<PlacePhotoDto> userPhoto;
		private List<TourAnswerDto> tourAnswer;
		private PlaceLikeDto userLike;
		private PlaceMarkDto userMark;
		private int likeCount;
	}
	
	@Data
	@AllArgsConstructor
	static class JsonCourseData {
		private List<HashMap<String, Object>> course;
	}
	
	// 관광지 메인페이지 (4개 랜덤 출력)
	@GetMapping("/place/main/{areaCode}")
	public JsonPlaceMain<List<PlaceDto>> getPlaceMain(
			@PathVariable(name="areaCode") int areaCode) { 
		List<PlaceDto> list = service.getFourDatasByRandom(areaCode);
		return new JsonPlaceMain<List<PlaceDto>>(list);
	}
	
	// 관광지 리스트 제목순
	@GetMapping("/places/title/{currentPage}/{areaCode}")
	public JsonPlaceList getPlaceListBytitle(
			@PathVariable(name="currentPage") int currentPage,
			@PathVariable(name="areaCode") int areaCode){
//		System.out.println(currentPage + orderBy + areaCode);
		HashMap<String, Object> map = new HashMap<String, Object>();
		List<JoinPlaceListDto> place = null;
		int totalCount = 0;
		int totalPage = 0;
		map.put("orderBy", "title");
		map.put("areaCode", areaCode);
		if(areaCode!=100) { // 지역 검색
			totalCount = service.getTotalCountInArea(areaCode);
			totalPage = totalCount/10 + (totalCount%10>0?1:0);
		}else { // 전국
			totalCount = service.getTotalCount();
			totalPage = totalCount/10 + (totalCount%10>0?1:0);
		}
		int start=pagingService.getPagingData(totalCount, currentPage).get("start");
	    int perPage=pagingService.getPagingData(totalCount, currentPage).get("perPage");
		map.put("start", start);
		map.put("perPage", perPage);
//		System.out.println(map);
		if(areaCode==100) { // 지역 검색
			place = service.searchPlaceByTitleInNation(map);
		}else { // 전국
			place = service.searchPlaceByTitleInArea(map);
		}
//		System.out.println(place);
		return new JsonPlaceList(place, totalCount, totalPage);
	}
	
	//관광지 리스트 좋아요순
	@GetMapping("/places/like/{currentPage}/{areaCode}")
	public JsonPlaceList getPlaceListByLike(
			@PathVariable(name="currentPage") int currentPage,
			@PathVariable(name="areaCode") int areaCode){
//		System.out.println(currentPage + orderBy + areaCode);
		HashMap<String, Object> map = new HashMap<String, Object>();
		List<JoinPlaceListDto> place = null;
		int totalCount = 0;
		int totalPage = 0;
		map.put("orderBy", "title");
		map.put("areaCode", areaCode);
		if(areaCode!=100) { // 지역 검색
			totalCount = service.getTotalCountInArea(areaCode);
			totalPage = totalCount/10 + (totalCount%10>0?1:0);
		}else { // 전국
			totalCount = service.getTotalCount();
			totalPage = totalCount/10 + (totalCount%10>0?1:0);
		}
		int start=pagingService.getPagingData(totalCount, currentPage).get("start");
	    int perPage=pagingService.getPagingData(totalCount, currentPage).get("perPage");
		map.put("start", start);
		map.put("perPage", perPage);
//		System.out.println(map);
		if(areaCode==100) { // 지역 검색
			place = service.searchPlaceByLikeInNation(map);
		}else { // 전국
			place = service.searchPlaceByLikeInArea(map);
		}
//		System.out.println(place);
		return new JsonPlaceList(place, totalCount, totalPage);
	}
	
	// 관광지 디테일 페이지
	@GetMapping("/place/detail/{contentId}")
	public JsonPlaceDetail getPlaceDetailList(@PathVariable(name="contentId") int contentId,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		PlaceDto place = service.getPlaceDetail(contentId);
		List<PlaceApiPhotoDto> apiPhoto = service.getPlaceDetailApiPhotos(contentId);
		List<PlacePhotoDto> userPhoto = service.getPlaceDetailPhotos(contentId);
		List<TourAnswerDto> tourAnswer = service.getAnswerOfPlace(contentId);
		PlaceLikeDto userLike = null;
		PlaceMarkDto userMark = null;
		if(session.getAttribute(USER)!=null) {
			UserDto user=(UserDto)session.getAttribute(USER);
			int userNum = user.getUserNum();
			PlaceLikeDto ldto = new PlaceLikeDto();
			ldto.setLoginNum(userNum);
			ldto.setContentId(contentId);
			userLike = service3.getDataByUser(ldto);
			PlaceMarkDto mdto = new PlaceMarkDto();
			mdto.setContentId(contentId);
			mdto.setUserNum(userNum);
			userMark = service4.getDataByUser(mdto);
		}
		int likeCount = service.getLikeCountOfPlace(contentId);
		
		return new JsonPlaceDetail(place, apiPhoto, userPhoto, tourAnswer, userLike, userMark, likeCount);
	}
	
	// 코스 담기 클릭시 사용자 코스 전체 보기
	@GetMapping("/place/detail/course/{userNum}")
	public JsonCourseData getCourseByUser(@PathVariable(name="userNum") int userNum) {
		List<CourseDto> list = service.getCourseByUser(userNum);
		HashMap<String, Object> col = null;
		List<HashMap<String, Object>> course = new ArrayList<HashMap<String,Object>>();
		for(CourseDto dto: list) {
			col = new HashMap<String, Object>();
			col.put("courseNum", dto.getCourseNum());
			col.put("userNum", dto.getUserNum());
			col.put("name", dto.getName());
			course.add(col);
		}
		
		return new JsonCourseData(course);
	}
	
	// 좋아요 추가
	@PostMapping("/place/detail/like/{contentId}")
	public String plusPlaceLike(
			@PathVariable(name="contentId") int contentId,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		PlaceLikeDto dto = new PlaceLikeDto();
		dto.setContentId(contentId);
		if(session.getAttribute(USER)!=null) {
			UserDto user=(UserDto)session.getAttribute(USER);
			int loginNum = user.getUserNum();
			dto.setLoginNum(loginNum);
		}else {
			return "needlogin";
		}
		int cnt = service3.getPlaceLikeCountByUser(dto);
		if(cnt == 0) {
			service3.plusPlaceLikes(dto);
			return "success";
		}else {
			return "fail";
		}
	}
	
	// 좋아요 삭제
	@DeleteMapping("/place/detail/like/delete/{contentId}")
	public String minusPlaceLike(
			@PathVariable(name="contentId") int contentId,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		PlaceLikeDto dto = new PlaceLikeDto();
		dto.setContentId(contentId);
		if(session.getAttribute(USER)!=null) {
			UserDto user=(UserDto)session.getAttribute(USER);
			int loginNum = user.getUserNum();
			dto.setLoginNum(loginNum);
		}else {
			return "needlogin";
		}
		int cnt = service3.getPlaceLikeCountByUser(dto);
		if(cnt == 1) {
			service3.deletePlaceLikeByUser(dto);
			return "success";
		}else {
			return "fail";
		}	
	}
	
	// 즐겨찾기 추가
	@PostMapping("/place/detail/mark/{contentId}")
	public String plusPlaceMark(
			@PathVariable(name="contentId") int contentId,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		PlaceMarkDto dto = new PlaceMarkDto();
		dto.setContentId(contentId);
		if(session.getAttribute(USER)!=null) {
			UserDto user=(UserDto)session.getAttribute(USER);
			int userNum = user.getUserNum();
			dto.setUserNum(userNum);
		}else {
			return "needlogin";
		}
		int cnt = service4.getPlaceMarkCountByUser(dto);
		if(cnt == 0) {
			service4.insertPlaceMark(dto);
			return "success";
		}else {
			return "fail";
		}
	}
	
	// 즐겨찾기 삭제
	@DeleteMapping("/place/detail/mark/delete/{contentId}")
	public String minusPlaceMark(
			@PathVariable(name="contentId") int contentId,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		PlaceMarkDto dto = new PlaceMarkDto();
		dto.setContentId(contentId);
		if(session.getAttribute(USER)!=null) {
			UserDto user=(UserDto)session.getAttribute(USER);
			int userNum = user.getUserNum();
			dto.setUserNum(userNum);
		}else {
			return "needlogin";
		}
		int cnt = service4.getPlaceMarkCountByUser(dto);
		if(cnt == 1) {
			service4.deletePlaceMarkByUser(dto);
			return "success";
		}else{
			return "fail";
		}
	}
	
	// 사진 추가
	@PostMapping("/place/detail/photo")
	public void insertUserPhoto(
			@RequestParam int contentId,
			@RequestParam List<MultipartFile> images,
			@RequestParam int loginNum
			,HttpServletRequest request
			) {
		// 파일 업로드 경로
		String path = request.getSession().getServletContext().getRealPath("/placeImg");
		System.out.println(path);
		SpringFileWriter writer = new SpringFileWriter();
		String upload = "";
		for(MultipartFile file: images) {
			// 업로드 안한경우 첫파일의 파일명이 빈문자열
			if(file.getOriginalFilename().length() == 0) {
				upload = "no";
				break;
			}
			
			upload = writer.changeFilename(file.getOriginalFilename());
			// 이미지 save 폴더에 저장
			writer.writeFile(file, upload, path);
			
			PlacePhotoDto dto = new PlacePhotoDto();
			dto.setContentId(contentId);
			dto.setImage(upload);
			dto.setLoginNum(loginNum);
			service2.insertData(dto);
		}
		
	}
}
