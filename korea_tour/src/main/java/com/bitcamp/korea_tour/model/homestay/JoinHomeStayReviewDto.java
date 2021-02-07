package com.bitcamp.korea_tour.model.homestay;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("joinhomestayreview")
public class JoinHomeStayReviewDto {
   //HomeStayReview
   private int homeStayReviewNum;
   private Date writeday;
   private int userNum;
   private int homeStayNum;
   private int relevel;
   private int regroup;
   private int loginNum;
   private String loginId;
   private String loginPhoto;
   private String content;
   private int deleted;
   
   //HomeStayReviewPhotoDto
   private int photoNum;
   //private int homeStayReviewNum;
   private String photoName;
   
}