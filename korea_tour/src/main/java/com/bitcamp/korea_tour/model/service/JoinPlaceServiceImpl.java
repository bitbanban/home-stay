package com.bitcamp.korea_tour.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.CourseDto;
import com.bitcamp.korea_tour.model.CoursePlaceDto;
import com.bitcamp.korea_tour.model.JoinPlaceListDto;
import com.bitcamp.korea_tour.model.PlaceApiPhotoDto;
import com.bitcamp.korea_tour.model.PlaceDto;
import com.bitcamp.korea_tour.model.PlacePhotoDto;
import com.bitcamp.korea_tour.model.TourAnswerDto;
import com.bitcamp.korea_tour.model.JoinPlaceDto;
import com.bitcamp.korea_tour.model.mapper.JoinPlaceMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JoinPlaceServiceImpl implements JoinPlaceService{
   
   private final JoinPlaceMapper mapper;
   
   @Override
   public List<JoinPlaceDto> getTotalPlaceMark(int loginNum,HashMap<String, Object> map) {
      // TODO Auto-generated method stub
      return mapper.getTotalPlaceMark(loginNum, map);
   }

   @Override
   public List<PlaceDto> getFourDatasByRandom(int areaCode) {
      // TODO Auto-generated method stub
      return mapper.getFourDatasByRandom(areaCode);
   }

   @Override
   public int getTotalCount() {
      // TODO Auto-generated method stub
      return mapper.getTotalCount();
   }

   @Override
   public int getTotalCountInArea(int areaCode) {
      // TODO Auto-generated method stub
      return mapper.getTotalCountInArea(areaCode);
   }

   @Override
   public PlaceDto getPlaceDetail(int contentId) {
      // TODO Auto-generated method stub
      return mapper.getPlaceDetail(contentId);
   }

   @Override
   public List<PlaceApiPhotoDto> getPlaceDetailApiPhotos(int contentId) {
      // TODO Auto-generated method stub
      return mapper.getPlaceDetailApiPhotos(contentId);
   }

   @Override
   public List<PlacePhotoDto> getPlaceDetailPhotos(int contentId) {
      // TODO Auto-generated method stub
      return mapper.getPlaceDetailPhotos(contentId);
   }

   @Override
   public List<TourAnswerDto> getAnswerOfPlace(int contentId) {
      // TODO Auto-generated method stub
      return mapper.getAnswerOfPlace(contentId);
   }

   @Override
   public List<CourseDto> getCourseByUser(int userNum) {
      // TODO Auto-generated method stub
      return mapper.getCourseByUser(userNum);
   }

   @Override
   public void insertPlaceIntoCourse(CoursePlaceDto dto) {
      // TODO Auto-generated method stub
      mapper.insertPlaceIntoCourse(dto);
   }

   @Override
   public int getMaxOrderNum(int coursePlaceNum) {
      // TODO Auto-generated method stub
      return mapper.getMaxOrderNum(coursePlaceNum);
   }

   @Override
   public List<JoinPlaceListDto> keywordSearchPlaceByTitle(HashMap<String, Object> map) {
      // TODO Auto-generated method stub
      return mapper.keywordSearchPlaceByTitle(map);
   }

   @Override
   public List<JoinPlaceListDto> keywordSearchPlaceBylike(HashMap<String, Object> map) {
      // TODO Auto-generated method stub
      return mapper.keywordSearchPlaceBylike(map);
   }

   @Override
   public List<JoinPlaceListDto> searchPlaceByTitleInArea(HashMap<String, Object> map) {
      // TODO Auto-generated method stub
      return mapper.searchPlaceByTitleInArea(map);
   }

   @Override
   public List<JoinPlaceListDto> searchPlaceByTitleInNation(HashMap<String, Object> map) {
      // TODO Auto-generated method stub
      return mapper.searchPlaceByTitleInNation(map);
   }

   @Override
   public List<JoinPlaceListDto> searchPlaceByLikeInArea(HashMap<String, Object> map) {
      // TODO Auto-generated method stub
      return mapper.searchPlaceByLikeInArea(map);
   }

   @Override
   public List<JoinPlaceListDto> searchPlaceByLikeInNation(HashMap<String, Object> map) {
      // TODO Auto-generated method stub
      return mapper.searchPlaceByLikeInNation(map);
   }

   @Override
   public int getTotalCountByKeywordSearch(String keyword) {
      // TODO Auto-generated method stub
      return mapper.getTotalCountByKeywordSearch(keyword);
   }

   @Override
   public int getTotalCountMyPlaceMark(int userNum) {
      // TODO Auto-generated method stub
      return mapper.getTotalCountMyPlaceMark(userNum);
   }

@Override
public int getLikeCountOfPlace(int contentId) {
	// TODO Auto-generated method stub
	return mapper.getLikeCountOfPlace(contentId);
}


}