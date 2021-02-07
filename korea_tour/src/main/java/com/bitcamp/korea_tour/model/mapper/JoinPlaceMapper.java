package com.bitcamp.korea_tour.model.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.bitcamp.korea_tour.model.CourseDto;
import com.bitcamp.korea_tour.model.CoursePlaceDto;
import com.bitcamp.korea_tour.model.JoinPlaceListDto;
import com.bitcamp.korea_tour.model.PlaceApiPhotoDto;
import com.bitcamp.korea_tour.model.PlaceDto;
import com.bitcamp.korea_tour.model.PlacePhotoDto;
import com.bitcamp.korea_tour.model.TourAnswerDto;
import com.bitcamp.korea_tour.model.JoinPlaceDto;

@Mapper
public interface JoinPlaceMapper {
   List<JoinPlaceDto> getTotalPlaceMark(int loginNum, HashMap<String, Object> map);
   int getTotalCountMyPlaceMark(int userNum);
   List<PlaceDto> getFourDatasByRandom(int areaCode);
   int getTotalCount();
   int getTotalCountInArea(int areaCode);
   List<JoinPlaceListDto> searchPlaceByTitleInArea(HashMap<String, Object> map);
   List<JoinPlaceListDto> searchPlaceByTitleInNation(HashMap<String, Object> map);
   List<JoinPlaceListDto> searchPlaceByLikeInArea(HashMap<String, Object> map);
   List<JoinPlaceListDto> searchPlaceByLikeInNation(HashMap<String, Object> map);
   PlaceDto getPlaceDetail(int contentId);
   List<PlaceApiPhotoDto> getPlaceDetailApiPhotos(int contentId);
   List<PlacePhotoDto> getPlaceDetailPhotos(int contentId);
   List<TourAnswerDto> getAnswerOfPlace(int contentId);
   int getLikeCountOfPlace(int contentId);
   
   List<CourseDto> getCourseByUser(int userNum);
   void insertPlaceIntoCourse(CoursePlaceDto dto);
   int getMaxOrderNum(int coursePlaceNum);
   int getTotalCountByKeywordSearch(String keyword);
   List<JoinPlaceListDto> keywordSearchPlaceByTitle(HashMap<String, Object> map);
   List<JoinPlaceListDto> keywordSearchPlaceBylike(HashMap<String, Object> map);
   
}