package com.bitcamp.korea_tour.model.homestay;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("homestayreviewphoto")
public class HomeStayReviewPhotoDto {
	private int photoNum;
	private int homeStayNum;	
	private int homeStayReviewNum;
	private String photoName;
	

}
