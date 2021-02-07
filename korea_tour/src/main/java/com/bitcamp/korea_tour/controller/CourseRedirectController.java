package com.bitcamp.korea_tour.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class CourseRedirectController {
	
	@GetMapping("/tourmypage")
	public String goMypage(){
		
		return "mypage/mypage";
	}
	
	@GetMapping("/tourmypage/favorite")
	public String goMypageFavorite(@RequestParam(defaultValue="1") int currentPage, Model model){
		model.addAttribute("currentPage", currentPage);
		return "mypage/favorite";
	}
	
	@GetMapping("/tourmypage/answer")
	public String goMypageAnswer(@RequestParam(defaultValue="1") int currentPage, Model model){
		model.addAttribute("currentPage", currentPage);
		System.out.println(currentPage);
		return "mypage/answer";
	}
	
	@GetMapping("/tourmypage/courselist")
	public String goMycourseList(@RequestParam(defaultValue="1") int currentPage, Model model){
		model.addAttribute("currentPage", currentPage);
		return "mypage/courselist";
	}
	
	@GetMapping("/tourmypage/courselist/detail")
	public String goMycourseDetail(){
		
		return "mypage/course";
	}
	
	@GetMapping("/tourcourse")
	public String goCourse(@RequestParam(defaultValue="1") int currentPage,
			@RequestParam String who,
			@RequestParam String during,
			@RequestParam String how,Model model){
		
		model.addAttribute("currentPage", currentPage);
		model.addAttribute("who", who);
		model.addAttribute("during", during);
		model.addAttribute("how", how);
		
		return "course/list";
	}
	
	@GetMapping("/tourcourse/detail")
	public String goCourseDetail(){
		
		return "course/detail";
	}
	
	
	
}
