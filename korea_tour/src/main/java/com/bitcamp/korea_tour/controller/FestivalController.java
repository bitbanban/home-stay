package com.bitcamp.korea_tour.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller 
public class FestivalController {


    @GetMapping({"/festival/main","/festival"})
    public String getFestivalMain() {

        return "festival/main";
    }
    
    @GetMapping("/festival/list")
    public String getFestivalList(@RequestParam String areaCode,@RequestParam String pageNum,Model model,@RequestParam String month) {
    	model.addAttribute("areaCode",areaCode);
    	model.addAttribute("pageNum", pageNum);
    	model.addAttribute("month", month);
    	return "festival/list";
    }
    
    @GetMapping("/festival/detail")
    public String getFestivalDetail(@RequestParam String areaCode,@RequestParam String contentId,Model model,@RequestParam String pageNum,@RequestParam String month) {
    	model.addAttribute("contentId", contentId);
    	model.addAttribute("areaCode",areaCode);
    	model.addAttribute("pageNum", pageNum);
    	model.addAttribute("month", month);
    	return "festival/detail";
  	
    }
}
