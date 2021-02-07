package com.bitcamp.korea_tour.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
   
   @GetMapping({"/index","/"})
   public String getMain(HttpServletRequest request) {

      return "home/home";
   }
   
   //로그인페이지 이동
   @GetMapping("/login")
   public String goLoginMain() {
      return "login/loginform";
   }
   
   //관리자 로그인폼 이동
   @GetMapping("/login/admin")
   public String goAdminLogin() {
      return "login/adminloginform";
   }
   
   //로그아웃
   @GetMapping(value="/logout")
   public String logOut(HttpServletRequest request) {
      HttpSession session=request.getSession();
      session.invalidate();
      
      return "redirect:/";
   }

}