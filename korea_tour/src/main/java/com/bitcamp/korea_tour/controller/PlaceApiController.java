package com.bitcamp.korea_tour.controller;

import java.io.IOException;
import java.util.List;

import javax.xml.parsers.ParserConfigurationException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.xml.sax.SAXException;

import com.bitcamp.korea_tour.model.PlaceApiPhotoDto;
import com.bitcamp.korea_tour.model.PlaceDto;
import com.bitcamp.korea_tour.model.service.PlaceApiPhotoServiceImpl;
import com.bitcamp.korea_tour.model.service.PlaceServiceImpl;
import com.bitcamp.korea_tour.util.TourApi;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping(value="/public/place")
public class PlaceApiController {

	private final PlaceServiceImpl service;
	
	private final PlaceApiPhotoServiceImpl service2;
	
	@ResponseBody
	@RequestMapping(value="/input")
	public String insertApiPlaces() throws IOException, ParserConfigurationException, SAXException {
		TourApi api = new TourApi();
		//service.deleteAllApiPlace();
		for(int a=0; a<=100; a++) {
			System.out.println(a +"th cycle : ");
			List<PlaceDto> list = api.insertPlaceList(String.valueOf(a));
			for(PlaceDto dto : list) {
				if(service.checkPlace(dto.getContentId()) == 0) {
					service.insertApiPlaces(dto); 
				}
			}
		}
		
		return "관광지 데이터 추가 성공";
	}
	
	@ResponseBody
	@RequestMapping(value="/update")
	public String updateApiPlaces() throws IOException, ParserConfigurationException, SAXException {
		TourApi api = new TourApi();
		List<PlaceDto> list = service.getAllApiPlace();
		PlaceDto dto;
		int fixContentId;
		for(int i=0; i<list.size(); i++) {
			dto= list.get(i);
			System.out.println(dto);
			fixContentId = dto.getContentId();
			if(service.checkPlace(fixContentId) == 1) {
				System.out.println(i);
				service.updatePlaceDetail(api.updatePlace(String.valueOf(fixContentId)));
			}
		}
		
		return "contentId " + service.getUpdateStartNum() + "번까지 관광지 디테일 수정 성공";
	}
	
	@ResponseBody
	@RequestMapping(value="/photo")
	public String insertAllPlaceApiPhotos() throws IOException, ParserConfigurationException, SAXException {
		TourApi api = new TourApi();
		List<PlaceDto> plist = service.getAllApiPlace();
		PlaceDto pdto;
		int insertCount = 0;
		//int i=service2.getCountToContentId()
		for(int i=0; i<plist.size(); i++) {
			System.out.println(i);
			pdto = plist.get(i);
			if(service2.checkIsNewData(pdto.getContentId()) == 0) {
				List<PlaceApiPhotoDto> list = api.getAllApiPhotos(String.valueOf(pdto.getContentId()));
				insertCount++;
				for (PlaceApiPhotoDto dto : list) {
//					System.out.println(dto);
					service2.insertApiPhoto(dto);
				}
				System.out.println("현재 i:" +i+ "번째, 주입개수:"+insertCount);
			}
		}
		
		return service2.getCountToContentId() + "개 관광지 사진 업로드 성공";
	}
}
