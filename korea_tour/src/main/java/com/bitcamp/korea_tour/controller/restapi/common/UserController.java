package com.bitcamp.korea_tour.controller.restapi.common;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.korea_tour.model.UserDto;
import com.bitcamp.korea_tour.model.service.UserService;
import com.bitcamp.korea_tour.model.service.login.setting.SessionNames;
import com.bitcamp.korea_tour.model.service.paging.PagingService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value="/api")
public class UserController implements SessionNames {
	private final UserService us;
	private final PagingService pagingService;
	
	private int start;
	private int perPage;
	private int totalCount;
	private int totalPage;

	/**
	 * 회원탈퇴(사용자), 회원삭제(관리자)
	 * @param request
	 */
	@DeleteMapping(value = {"/mypage/users/{userNum}","/admin/member/{userNum}"})
	public void deleteUser(@PathVariable(value="userNum") int userNum) {
		us.deleteUser(userNum);
	}
	
	/**
	 * @return 사용자 목록(관리자페이지)
	 */
	@GetMapping(value="/admin/users/{currentPage}") 
	public JsonData<List<UserDto>>getAllUsers(@PathVariable(value="currentPage") int currentPage) {
		totalCount=us.getUserTotalCount();
		start=pagingService.getPagingData(totalCount, currentPage).get("start");
		perPage=pagingService.getPagingData(totalCount, currentPage).get("perPage");
		totalPage=pagingService.getPagingData(totalCount, currentPage).get("totalPage");
		
		List<UserDto> list=us.getUserList(start,perPage);
		return new JsonData<List<UserDto>>(list, totalPage);
	}
	
	@Data
	@AllArgsConstructor
	static class JsonData<T> {
		private T list;
		int totalPage;
	}

}
