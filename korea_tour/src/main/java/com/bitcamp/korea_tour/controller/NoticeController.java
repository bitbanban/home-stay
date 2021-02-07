package com.bitcamp.korea_tour.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bitcamp.korea_tour.model.NoticeDto;
import com.bitcamp.korea_tour.model.service.NoticeService;
import com.bitcamp.korea_tour.model.service.paging.PagingService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class NoticeController{
   private final NoticeService ns;
   private final PagingService pagingService;

   int totalCount=0;
   int start=0;
   int perPage=0;
   int totalPage=0;
   
//restapi
   
   /**
    * 공지사항 리스트
    * @param currentPage
    * @return 공지사항 리스트로 이동
    */
   @GetMapping("/api/notice/{currentPage}")
   @ResponseBody
   public JsonData<List<NoticeDto>> getNoticeList(@PathVariable(value="currentPage") int currentPage) {

      totalCount=ns.getTotalCount();
      /* System.out.println(totalCount); */
      start=pagingService.getPagingData(totalCount, currentPage).get("start");
      perPage=pagingService.getPagingData(totalCount, currentPage).get("perPage");
      totalPage=pagingService.getPagingData(totalCount, currentPage).get("totalPage");

      System.out.println("공지사항 토탈페이지: "+totalPage);
      List<NoticeDto> list = ns.getAllDatas(start, perPage);

      return new JsonData<List<NoticeDto>>(list, totalPage);

   }
   /**
    * 공지사항 디테일 페이지
    * @param noticeNum
    * @return 공지사항 디테일 페이지로 이동
    */

   @GetMapping("/api/notice/detail/{noticeNum}")
   @ResponseBody
   public JsonDetail getNoticeDetail(@PathVariable(name="noticeNum") int noticeNum) {
      NoticeDto dto = ns.getData(noticeNum);

      return new JsonDetail(dto);
   }
   /**
    * 공지사항 인서트
    * @param dto
    * @return
    */
   @PostMapping("/api/admin/noticeinsert")
  
   public String insertNotice(@ModelAttribute NoticeDto dto) {      
      ns.insertNotice(dto);

      return "redirect:/admin/noticelist?currentPage=1";
   }
   /**
    * 공지사항 수정
    * @param dto
    * @param noticeNum
    */
   
   @ResponseBody
   @RequestMapping(value = "/api/admin/noticeupdate/{noticeNum}", method = RequestMethod.POST)
   public String updateNotice(@RequestBody NoticeDto dto,@PathVariable int noticeNum) {
      ns.updateNotice(noticeNum, dto);
      
      return "redirect:/api/notice/detail/{noticeNum}";
   }
   /**
    * 공지사항 삭제
    * @param noticeNum
    */
   @ResponseBody
   @DeleteMapping(value = "/api/admin/noticedelete/{noticeNum}")
   public void deleteNotice(@PathVariable(name="noticeNum") int noticeNum) {
      ns.deleteNotice(noticeNum); 
   }

   /**
    * 공지사항 조회수 증가
    * @param dto
    * @param noticeNum
    */
   @ResponseBody
   @PostMapping(value = "/api/noticeviews/{noticeNum}")
   public void updateViews(@PathVariable int noticeNum) {
      ns.countViews(noticeNum);
   }

/////////////////////////////////////////뷰매핑

   /**
    * 공지사항 리스트(관리자)
    * @param currentPage
    * @param model
    * @return 공지사항 리스트
    */
   @GetMapping("/admin/noticelist")
   public String goNoticeListAdmin(@RequestParam(name = "currentPage", defaultValue = "1") int currentPage,Model model) {
      model.addAttribute("currentPage", currentPage);
      return "admin/adminnoticelist";      
   }
   
   /**
    * 공지사항 리스트(사용자)
    * @param currentPage
    * @param model
    * @return 공지사항 리스트
    */
   @GetMapping("/noticelist")
   public String goNoticeListUser(@RequestParam(name = "currentPage", defaultValue = "1")int currentPage,Model model) {
      model.addAttribute("currentPage", currentPage);
      return "admin/usernoticelist";      
   }
   
   /**
    * 공지사항 디테일(관리자)
    * @param currentPage
    * @param noticeNum
    * @param model
    * @return
    */
   @GetMapping("/admin/notice/detail")
   public String goAdminNoticeDetailAdmin(@RequestParam(name = "currentPage", defaultValue = "1") int currentPage,@RequestParam int noticeNum,Model model) {
      model.addAttribute("currentPage", currentPage);
      model.addAttribute("noticeNum", noticeNum);
      return "admin/adminnoticedetail";
   }
   
   /**
    * 공지사항 디테일(사용자)
    * @param currentPage
    * @param noticeNum
    * @param model
    * @return
    */
   @GetMapping("/notice/detail")
   public String goAdminNoticeDetailUser(@RequestParam(name = "currentPage", defaultValue = "1") int currentPage,@RequestParam int noticeNum,Model model) {
      model.addAttribute("currentPage", currentPage);
      model.addAttribute("noticeNum", noticeNum);
      return "admin/usernoticedetail";
   }

   
   /**
    * 공지사항 입력폼
    * @return 
    */
   @GetMapping("/admin/notice/form")
   public String goAdminNoticeForm() {

      return "admin/noticeaddform";
   }
   
   /**
    * 공지사항 업데이트폼
    * @return
    */
   @GetMapping("/admin/notice/updateform")
   public String goAdminNoticeUpdateForm(@RequestParam int noticeNum,Model model ) {
      model.addAttribute("noticeNum", noticeNum);
      return "admin/noticeupdateform";
   }
   
//   /**
//    * 공지사항 업데이트
//    * @param noticeNum
//    * @param currentPage
//    * @param model
//    * @param dto
//    * @return 공지사항 리스트
//    */
//   @PostMapping("/admin/notice/update/{currentPage}")
//   public String goAdminNoticeUpdate(@RequestParam int noticeNum,@PathVariable int currentPage,Model model,@ModelAttribute NoticeDto dto) {
//      ns.updateNotice(noticeNum, dto);
//      model.addAttribute("currentPage", currentPage);
//      model.addAttribute("noticeNum", noticeNum);
//      return "admin/noticedetail";
//   } 
//
//
//   @GetMapping("/admin/notice/delete")
//   public String goAdminNoticeDelete(@RequestParam int noticeNum,@RequestParam int currentPage,Model model) {
//      model.addAttribute("noticeNum", noticeNum);
//      model.addAttribute("currentPage", currentPage);
//      return "admin/noticelist";
//   }
   
   
   @Data
   @AllArgsConstructor
   static class JsonData<T> {
      private T notices;
      int totalPage;
   }
   
   @Data
   @AllArgsConstructor
   static class JsonDetail {
      private NoticeDto noticeDetail;
   }
}