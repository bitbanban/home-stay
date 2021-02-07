package com.bitcamp.korea_tour.model;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("placePhoto")
public class PlacePhotoDto {
	private int photoNum;
	private int contentId;
	private int approval;
	private String image;
	private int loginNum;
	
	// 이미지일경우 true리턴
//	public boolean isImage(String filename) {
//		// 파일명 .의 위치 얻기
//		int dotIdx = filename.indexOf(".");
//		// dot의 위치 다음글자부터 끝까지 추출(확장자)
//		String ext = filename.substring(dotIdx+1);
//		// 확장자가 이미지파일이면 true리턴
//		if(ext.equalsIgnoreCase("png")||ext.equalsIgnoreCase("jpg")
//				||ext.equalsIgnoreCase("jpeg")
//				||ext.equalsIgnoreCase("gif")) {
//			return true;
//		}else {
//			return false;
//		}
//	}
}
