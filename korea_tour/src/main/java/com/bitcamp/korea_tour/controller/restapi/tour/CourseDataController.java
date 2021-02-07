package com.bitcamp.korea_tour.controller.restapi.tour;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.korea_tour.model.CourseDto;
import com.bitcamp.korea_tour.model.CoursePlaceDto;
import com.bitcamp.korea_tour.model.UserDto;
import com.bitcamp.korea_tour.model.service.course.CoursePlaceService;
import com.bitcamp.korea_tour.model.service.course.CourseService;
import com.bitcamp.korea_tour.model.service.login.setting.SessionNames;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CourseDataController implements SessionNames {
	private final CourseService courseService;
	private final CoursePlaceService coursePlaceService;
	
	/**
	 * 코스 추가
	 * @param name
	 * @param request
	 */
	@PostMapping(value="/courses")
	public void insertCourse(
			@Param("name") String name,
			HttpServletRequest request
			) {
		HttpSession session = request.getSession();
		UserDto user = (UserDto)session.getAttribute(USER);
		int loginNum = user.getUserNum();
		
		courseService.insertCourseTitle(name, loginNum);
	}
	
	/**
	 * 코스관광지 추가
	 * @param dto
	 */
	@PostMapping(value="/courseplaces")
	public String insertCoursePlace(
			@RequestBody CoursePlaceDto dto
			) {
		if(coursePlaceService.checkNewPlaceInCourse(dto) == 0) {
			coursePlaceService.insertCoursePlace(dto);
			return "success";
		}
		return "fail";
	}
	
	/**
	 * 코스 삭제
	 * @param courseNum
	 */
	@DeleteMapping(value="/courses/{courseNum}")
	public void deleteCourse(
			@PathVariable int courseNum
			) {
		courseService.deleteMyCourse(courseNum);
	}
	
	/**
	 * 코스관광지 삭제
	 * @param coursePlaceNum
	 */
	@DeleteMapping(value="/courseplaces/{coursePlaceNum}")
	public void deleteCoursePlace(
			@PathVariable int coursePlaceNum
			) {
		coursePlaceService.deleteCoursePlace(coursePlaceNum);
	}
	
	/**
	 * 코스 내용 수정
	 * @param dto
	 */
	@PatchMapping(value = "/courses")
	public void updateCourse(@RequestBody CourseDto dto) {
		courseService.updateCourseDetail(dto);
	}
	
	/**
	 * 코스관광지 순서 수정
	 * @param json
	 */
	@PatchMapping(value="/courseplaces", produces = "application/json; charset=utf8")
	public void updateCoursePlace(
			@RequestBody Map<String, List<CoursePlaceDto>> json
			) {
		coursePlaceService.updateCoursePlace(json.get("list"));
	}
	
}
