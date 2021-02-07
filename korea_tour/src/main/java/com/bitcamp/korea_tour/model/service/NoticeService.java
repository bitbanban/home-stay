package com.bitcamp.korea_tour.model.service;

import java.util.HashMap;
import java.util.List;

import com.bitcamp.korea_tour.model.NoticeDto;

public interface NoticeService {
   public int getTotalCount();
   public List<NoticeDto> getAllDatas(int start, int perPage);
   public void insertNotice(NoticeDto dto);
   public NoticeDto getData(int noticeNum);
   public void updateNotice(int noticeNum, NoticeDto dto);
   public void countViews(int noticeNum);
   public void deleteNotice(int noticeNum);
   public List<NoticeDto> getNewNotice();
   
}