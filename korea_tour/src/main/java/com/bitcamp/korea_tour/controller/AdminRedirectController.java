package com.bitcamp.korea_tour.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.bitcamp.korea_tour.model.AdminDto;
import com.bitcamp.korea_tour.model.service.AdminService;
import com.bitcamp.korea_tour.model.service.login.setting.SessionNames;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class AdminRedirectController implements SessionNames {
	private final AdminService adminService;
	private final HttpServletResponse response;
	
	  /**
	    * 관리자 로그인 db체크
	    * @param id
	    * @param password
	    * @param request
	    * @return 로그인성공시 관리자메인/ 실패시 관리자로그인페이지
	    */
	   @PostMapping("/login/admin/check")
	   public String checkAdmin(
	         @Param(value="id") String id,
	         @Param(value="password") String password,
	         HttpServletRequest request
	         ) {

	      System.out.println(adminService.checkAdmin(id, password));

	      if(adminService.checkAdmin(id, password)==1) {
	         AdminDto admin=adminService.getAdminData(id, password);
	         HttpSession session=request.getSession();
	         session.setAttribute(ADMIN, admin);
	         session.setMaxInactiveInterval(24*60*60);

	         return "admin/adminmain";
	      }else  {
	         return "login/adminloginform";
	      }
	   }
	
   //관리자 메인페이지

   @GetMapping("/admin")
   public String goAdminmain() {

      return "admin/adminmain";
   }
   
   //관리자 회원관리

   @GetMapping("/admin/member/list")
   public String goAdminMemberList() {

      return "admin/memberlist";
   }

   @GetMapping("/admin/member/delete")
   public String goAdminMemberDelete(@RequestParam int userNum,Model model) {
      model.addAttribute("userNum", userNum);
      return "admin/memberlist";
   }

   //관리자 댓글관리
   //댓글로 이동
   @GetMapping("/admin/comment/list")
   public String goAdminCommentList(@RequestParam int currentPage,Model model) {
      model.addAttribute("currentPage", currentPage);
      return "admin/commentlist";
   }

   //답글로 이동
   @GetMapping("/admin/recomment/list")
   public String goAdminReCommentList(@RequestParam int currentPage,Model model) {
      model.addAttribute("currentPage", currentPage);
      return "admin/recommentlist";
   }
   
   @GetMapping("/admin/comment/delete")
   public String goAdminCommentDelete(@RequestParam int tourAnswerNum,Model model,@RequestParam int currentPage) {
      model.addAttribute("tourAnswerNum", tourAnswerNum);
      model.addAttribute("currentPage", currentPage);
      return "admin/commentlist";
   }
   
   
   //Tour 사진관리
   @GetMapping("/admin/placephoto/list")
   public String goAdminDisapprovedPhotoList() {

      return "admin/placephotolist";
   }
   
   
   
   //////////////////홈스테이HOMESTAY/////////////////////////////
   
   @GetMapping("/admin/host/list")
   public String goAdminHostList() {

      return "admin/hostlist";
   }

   @GetMapping("/admin/host/detail")
   public String goAdminHostDetail( ) {

      return "admin/hostdetail";
   }

   @GetMapping("/admin/host/approval")
   public String goAdminHostApproval() {

      return "admin/hostlist";
   }

   @GetMapping("/admin/host/denial")
   public String goAdminHostDenial() {

      return "admin/hostlist";
   }
}