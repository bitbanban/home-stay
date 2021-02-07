package com.bitcamp.korea_tour.model.homestay;

import java.util.List;

import org.apache.ibatis.type.Alias;
import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
@Alias("homestayphoto")
public class HomeStayPhotoDto {
	private int homeStayPhotoNum;
	private int userNum;
	private int homeStayNum;
	private String photoName;
}
