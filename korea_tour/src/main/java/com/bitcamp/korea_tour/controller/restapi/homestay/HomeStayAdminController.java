package com.bitcamp.korea_tour.controller.restapi.homestay;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.korea_tour.model.homestay.HomeStayDto;
import com.bitcamp.korea_tour.model.service.UserService;
import com.bitcamp.korea_tour.model.service.homestay.HomeStayListService;
import com.bitcamp.korea_tour.model.service.paging.PagingService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/homestays/admin")
public class HomeStayAdminController {
   private final HomeStayListService homeStayListService;
   private final UserService userService;
   private final PagingService pagingService;
   
   int start=0;
   int perPage=10;
   int totalPage=0;
   int totalCount=0;
   
   /**
    * 관리자 홈스테이 집목록(대기중)
    * @param currentPage
    * @return
    */
   @GetMapping("/{currentPage}")
   public JsonList<List<HomeStayDto>> getAdminHomeStayList(
         @PathVariable(value="currentPage") int currentPage
         ) {
      
      start=pagingService.getPagingStart(currentPage, perPage);
      totalCount=homeStayListService.getTotalAdminHomeStayList();
      totalPage=pagingService.getPagingTotalPage(totalCount, perPage);
      
      List<HomeStayDto> list=homeStayListService.getAdminHomeStayList(start, perPage);
      List<JsonDto> jsonList=new ArrayList<JsonDto>();
      for(HomeStayDto dto:list) {
         
         int homeStayNum=dto.getHomeStayNum();
         String userName=userService.getUserData(dto.getUserNum()).getName();
         String title=dto.getTitle();
         String addr1=dto.getAddr1();
         
         JsonDto jdto=new JsonDto(homeStayNum, userName, title, addr1);
         jdto.setHomeStayNum(homeStayNum);
         jdto.setUserName(userName);
         jdto.setTitle(title);
         jdto.setAddr1(addr1);
         
         jsonList.add(jdto);
      }
      
      return new JsonList<List<HomeStayDto>>(jsonList, totalCount, totalPage);
   }
   
   
   /**
    * 홈스테이 승인
    * @param homeStayNum
    * @return
    */
   @PatchMapping("/{homeStayNum}/approve")
   public String approveHomeStay(
         @PathVariable(value="homeStayNum") int homeStayNum
         ) {
      homeStayListService.approveHomeStay(homeStayNum);
      
      return "홈스테이 승인 완료";
   }
   
   /**
    * 홈스테이 거절
    * @param homeStayNum
    * @return
    */
   @PatchMapping("/{homeStayNum}/deny")
   public String denyHomeStay(
         @PathVariable(value="homeStayNum") int homeStayNum
         ) {
      homeStayListService.denyHomeStay(homeStayNum);
      
      return "홈스테이 거절 완료";
   }
   
   
   @Data
   @AllArgsConstructor
   static class JsonList<T> {
      private List<JsonDto> list;
      private int totalCount;
      private int totalPage;
   }
   
   @Data
   @AllArgsConstructor
   static class JsonDto {
      private int homeStayNum;
      private String userName;
      private String title;
      private String addr1;
   }
   
   
}
