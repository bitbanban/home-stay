package com.bitcamp.korea_tour.controller.restapi.tour;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.korea_tour.model.CourseDto;
import com.bitcamp.korea_tour.model.JoinAnswerDto;
import com.bitcamp.korea_tour.model.JoinCourseDetailDto;
import com.bitcamp.korea_tour.model.JoinCourseDto;
import com.bitcamp.korea_tour.model.JoinCourseMarkDto;
import com.bitcamp.korea_tour.model.UserDto;
import com.bitcamp.korea_tour.model.JoinPlaceDto;
import com.bitcamp.korea_tour.model.service.JoinPlaceService;
import com.bitcamp.korea_tour.model.service.PlaceMarkService;
import com.bitcamp.korea_tour.model.service.TourAnswerService;
import com.bitcamp.korea_tour.model.service.course.CourseMarkService;
import com.bitcamp.korea_tour.model.service.course.CourseService;
import com.bitcamp.korea_tour.model.service.course.JoinCourseDetailService;
import com.bitcamp.korea_tour.model.service.course.JoinCourseMyService;
import com.bitcamp.korea_tour.model.service.login.setting.SessionNames;
import com.bitcamp.korea_tour.model.service.paging.PagingService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TourMypageController implements SessionNames {

	private final JoinCourseDetailService jsds;
	private final CourseMarkService cms;
	private final PlaceMarkService pms;
	private final CourseService cs;
	private final JoinCourseMyService jcms;
	private final TourAnswerService tas;
	private final JoinPlaceService jps;
	//페이징	
	private final PagingService pagingService;

	int totalCount=0;
	int start=0;
	int perPage=0;
	int totalPage=0;

	//mypage 첫 페이지
	@GetMapping("/tourmypage")
	public String getMypage(HttpServletRequest request) {

		HttpSession session = request.getSession();
		UserDto user = (UserDto)session.getAttribute(USER);
		int loginNum = user.getUserNum();
		//총 즐겨찾기 개수찾기
		int totalcoursemark = cms.getMyCourseMarkCount(loginNum);
		int totalplacemark = pms.getAllMyPlaceMarkCount(loginNum);
		int totalMark = totalcoursemark+totalplacemark;

		//나의 코스 개수 찾기
		int totalmycourse = cs.getMyCourseCount(loginNum);

		//나의 댓글 개수 찾기
		int myanswer = tas.getTotalCountAnswer(loginNum);
		int myreanswer = tas.getTotalCountReAnswer(loginNum);
		int totalmyanswer = myanswer+myreanswer;
		//보내기
		Map<String, Integer> mypagecount = new HashMap<String, Integer>();
		mypagecount.put("totalMark", totalMark);
		mypagecount.put("totalmycourse", totalmycourse);
		mypagecount.put("totalmyanswer", totalmyanswer);
		//System.out.println(mypagecount);

		Gson gson = new Gson();
		JsonObject json = gson.toJsonTree(mypagecount).getAsJsonObject();

		//System.out.println(json);
		return json.toString();
	}

	//mypage 내가 즐겨찾기한 코스 모아보기
	@GetMapping("/tourmypage/coursemarks/{currentPage}")
	public JsonData<List<JoinCourseMarkDto>> getMyCourseMarks(@PathVariable(value = "currentPage") int currentPage, HttpServletRequest request) {
		//세션가져오기
		HttpSession session = request.getSession();
		UserDto user = (UserDto)session.getAttribute(USER);
		int loginNum = user.getUserNum();

		totalCount=jcms.getMarkTotalCount(loginNum);
		start=pagingService.getPagingData(totalCount, currentPage).get("start");
		perPage=pagingService.getPagingData(totalCount, currentPage).get("perPage");
		totalPage=pagingService.getPagingData(totalCount, currentPage).get("totalPage");
		List<JoinCourseMarkDto> list = new ArrayList<JoinCourseMarkDto>();
		list = jcms.getMyMarkCourse(loginNum, start, perPage);
		//System.out.println(list);
		System.out.println("즐겨찾기 코스모아보기 토탈개수: "+totalCount);
		return new JsonData<List<JoinCourseMarkDto>>(list, totalPage);
	}
	
	//mypage 내가 즐겨찾기한 관광지 모아보기
	@GetMapping("/tourmypage/placemarks/{currentPage}")
	public JsonData<List<JoinPlaceDto>> getMyPlaceMarks(@PathVariable(value = "currentPage") int currentPage, HttpServletRequest request) {
		//세션가져오기
		HttpSession session = request.getSession();
		UserDto user = (UserDto)session.getAttribute(USER);
		int loginNum = user.getUserNum();
		totalCount=jps.getTotalCountMyPlaceMark(loginNum);
		start=pagingService.getPagingData(totalCount, currentPage).get("start");
		perPage=pagingService.getPagingData(totalCount, currentPage).get("perPage");
		totalPage=pagingService.getPagingData(totalCount, currentPage).get("totalPage");
		HashMap<String, Object> map=new HashMap<String, Object>();
		
		List<JoinPlaceDto> list = new ArrayList<JoinPlaceDto>();
				list = jps.getTotalPlaceMark(loginNum, map);
		//System.out.println(list);
		System.out.println("즐겨찾기 관광지 모아보기 토탈개수: "+totalCount);
		return new JsonData<List<JoinPlaceDto>>(list, totalPage);
	}
	
	//내가 단 댓글
	@GetMapping("/tourmypage/answer/{currentPage}")
	public JsonAnswer<List<JoinAnswerDto>> getMyAnswer(@PathVariable(value="currentPage") int currentPage, HttpServletRequest request) {
	    HttpSession session = request.getSession();
	    UserDto user = (UserDto)session.getAttribute(USER);
	    int loginNum = user.getUserNum();
	    		
	    totalCount=tas.getTotalCountAnswer(loginNum);
	    System.out.println(totalCount);
	    start=pagingService.getPagingData(totalCount, currentPage).get("start");
		perPage=pagingService.getPagingData(totalCount, currentPage).get("perPage");
		totalPage=pagingService.getPagingData(totalCount, currentPage).get("totalPage");
		
		
		List<JoinAnswerDto> answerlist= tas.getUserAnswer(loginNum, start, perPage);
		System.out.println("댓글 여기! loginNum: "+loginNum+"\n start : "+start+"\n perPage : "+perPage);
		return new JsonAnswer<List<JoinAnswerDto>>(answerlist, totalPage);
	   
    }
	 //내가 단 답글
	 @GetMapping("/tourmypage/reanswer/{currentPage}")
	 public JsonReAnswer<List<JoinAnswerDto>> getMyReAnswer(@PathVariable(value="currentPage") int currentPage, HttpServletRequest request) {
	    HttpSession session = request.getSession();
		UserDto user = (UserDto)session.getAttribute(USER);
		int loginNum = user.getUserNum();
		    		
		totalCount=tas.getTotalCountReAnswer(loginNum);
		start=pagingService.getPagingData(totalCount, currentPage).get("start");
		perPage=pagingService.getPagingData(totalCount, currentPage).get("perPage");
		totalPage=pagingService.getPagingData(totalCount, currentPage).get("totalPage");
		
		List<JoinAnswerDto> reanswerlist= tas.getUserReAnswer(loginNum, start, perPage);

		return new JsonReAnswer<List<JoinAnswerDto>>(reanswerlist, totalPage);
		   
	 }

	//나의 코스(내가만든코스)모아보기
	@GetMapping("/tourmypage/courses/{currentPage}")
	public JsonData<List<JoinCourseDto>> getMyCourse(@PathVariable(value = "currentPage") int currentPage, HttpServletRequest request) {
		//세션가져오기
		HttpSession session = request.getSession();
		UserDto user = (UserDto)session.getAttribute(USER);
		int loginNum = user.getUserNum();

		totalCount=jcms.getMyTotalCount(loginNum);
		start=pagingService.getPagingData(totalCount, currentPage).get("start");
		perPage=pagingService.getPagingData(totalCount, currentPage).get("perPage");
		totalPage=pagingService.getPagingData(totalCount, currentPage).get("totalPage");
		List<JoinCourseDto> list = jcms.getMyCourseList(loginNum, start, perPage);
		System.out.println("내가만든 코스모아보기 토탈개수: "+totalCount);
		return new JsonData<List<JoinCourseDto>>(list, totalPage);
	}
	
	//나의 코스 detail
	@GetMapping("/tourmypage/coursedetail/{courseNum}")
	public JsonDataList getMyCourseDetail(@PathVariable(value = "courseNum")int courseNum) {
		CourseDto courseDto=jsds.getCourseData(courseNum);
		List<JoinCourseDetailDto> coursePlaceList=jsds.getCourseDetail(courseNum);
		return new JsonDataList(courseDto, coursePlaceList);
	}
	
	// 댓글,답글 삭제
	@PostMapping(value = "/tourmypage/answer/{tourAnswerNum}")
	public void deleteAnswer(@PathVariable int tourAnswerNum) {
		tas.deleteCourseAnswerByUser(tourAnswerNum);
		tas.deletePlaceAnswerByUser(tourAnswerNum);
	}
	
	@DeleteMapping(value = "/placemarks/{markNum}")
	public void deletePlaceMark(@PathVariable int markNum){
		pms.deletePlaceMark(markNum);
	}
	
	@GetMapping("/tourmypage/courselist")
	public String getMyCourseList() {

		return "mypage/courselist";
	}
	
	


	@Data
	@AllArgsConstructor
	static class JsonData<T> {
		private T list;
		int totalPage;
	}


	@Data
	@AllArgsConstructor
	static class CountDataDto{
		private int totalMark;
		private int totalmycourse;
	}


	@Data
	@AllArgsConstructor
	static class MyPageDto{
		private String num;
	}
	
	@Data
	@AllArgsConstructor
	static class JsonAnswer<T>{

		private T Myanswer;
		int totalPage;
	}
	
	@Data
	@AllArgsConstructor
	static class JsonReAnswer<T>{

		private T MyReanswer;
		int totalPage;
	}
	
	@Data
	@AllArgsConstructor
	static class JsonDataList {
		private CourseDto courseDto; //dto
		private List<JoinCourseDetailDto> coursePlaceList;  //list
	}

	
}