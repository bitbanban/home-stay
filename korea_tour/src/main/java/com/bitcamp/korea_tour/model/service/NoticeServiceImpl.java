package com.bitcamp.korea_tour.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.NoticeDto;
import com.bitcamp.korea_tour.model.TourAnswerDto;
import com.bitcamp.korea_tour.model.mapper.NoticeMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

   private final NoticeMapper mapper;

   @Override
   public int getTotalCount() {
      // TODO Auto-generated method stub
      return mapper.getTotalCount();
   }

   @Override
   public List<NoticeDto> getAllDatas(int start, int perPage) {
      // TODO Auto-generated method stub
      Map<String, Object> map=new HashMap<String, Object>();
      map.put("start", start);
      map.put("perPage", perPage);
      List<NoticeDto> list = mapper.getAllDatas(map);
      return list;
   }

   @Override
   public void insertNotice(NoticeDto dto) {
      // TODO Auto-generated method stub
      mapper.insertNotice(dto);
   }

   @Override
   public NoticeDto getData(int noticeNum) {
      // TODO Auto-generated method stub
      return mapper.getData(noticeNum);
   }

   @Override
   public void updateNotice(int noticeNum, NoticeDto dto) {
      // TODO Auto-generated method stub
      Map<String, Object> map=new HashMap<String, Object>();
      map.put("dto", dto);
      map.put("noticeNum", noticeNum);

      mapper.updateNotice(map);
   }

   @Override
   public void deleteNotice(int noticeNum) {
      // TODO Auto-generated method stub
      mapper.deleteNotice(noticeNum);

   }

   @Override
   public List<NoticeDto> getNewNotice() {
      // TODO Auto-generated method stub
      return mapper.getNewNotice();
   }

   @Override
   public void countViews(int noticeNum) {
      // TODO Auto-generated method stub

      mapper.countViews(noticeNum);
      
   }

}