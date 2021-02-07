package com.bitcamp.korea_tour.controller.restapi.common;

import java.io.File;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.korea_tour.model.NoticeDto;
import com.bitcamp.korea_tour.model.PlacePhotoDto;
import com.bitcamp.korea_tour.model.TourAnswerDto;
import com.bitcamp.korea_tour.model.service.PlacePhotoService;
import com.bitcamp.korea_tour.model.service.TourAnswerService;
import com.bitcamp.korea_tour.model.service.paging.PagingService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AdminController {
	private final TourAnswerService tas;
	private final PagingService pagingService;
	private final PlacePhotoService pps;
	
	int totalCount=0;
	int start=0;
	int perPage=0;
	int totalPage=0;
	/**
	 * 관리자용 댓글조회
	 * @param currentPage
	 * @param request
	 * @return
	 */
	@GetMapping("/admin/answer/{currentPage}")
	public JsonAnswer<List<TourAnswerDto>> getAdminAnswer(@PathVariable(value="currentPage") int currentPage, HttpServletRequest request) {
		totalCount = tas.getTotalCountAnswerAdmin();
		System.out.println(totalCount);
		start=pagingService.getPagingData(totalCount, currentPage).get("start");
		perPage=pagingService.getPagingData(totalCount, currentPage).get("perPage");
		totalPage=pagingService.getPagingData(totalCount, currentPage).get("totalPage");

		List<TourAnswerDto> answer = tas.getAdminAnswer(start, perPage);
		return new JsonAnswer<List<TourAnswerDto>>(answer, totalPage);

	}
	/**
	 * 관리자용 답글 조회
	 * @param currentPage
	 * @param request
	 * @return
	 */
	@GetMapping("/admin/reanswer/{currentPage}")
	public JsonReAnswer<List<TourAnswerDto>> getAdminReAnswer(@PathVariable(value="currentPage") int currentPage, HttpServletRequest request) {
		totalCount = tas.getTotalCountReAnswerAdmin();
		start=pagingService.getPagingData(totalCount, currentPage).get("start");
		perPage=pagingService.getPagingData(totalCount, currentPage).get("perPage");
		totalPage=pagingService.getPagingData(totalCount, currentPage).get("totalPage");
		
		System.out.println("답글 토탈페이지: "+totalPage);
		System.out.println("답글 퍼페이지: "+perPage);
		List<TourAnswerDto> reAnswer = tas.getAdminReAnswer(start, perPage);
		return new JsonReAnswer<List<TourAnswerDto>>(reAnswer, totalPage);
		
	}
	/**
	 * 관리자용 댓글,답글 삭제
	 * @param tourAnswerNum
	 * 포스트 맵핑 임포트했는데 왜 임포트안됐다고 그러는거지 소스트리 충돌방지용 주석입니다
	 */
	@PostMapping(value = "/admin/answer/{tourAnswerNum}")
	public void deleteAnswer(@PathVariable int tourAnswerNum) {
		tas.deleteCourseAnswerByAdmin(tourAnswerNum);
		tas.deletePlaceAnswerByAdmin(tourAnswerNum);
	}
	
	/*
	 * 관리자 유저관광지 사진 신청 목록 조회
	 * @param x
	 * @return JsonAdminPhotos
	 */
	@GetMapping("/admin/place/photo")
	public JsonAdminPhotos getDisapprovedDatas() {
		List<PlacePhotoDto> photo = pps.getDisapprovedDatas();
		
		return new JsonAdminPhotos(photo);
	}
		
	/*
	 * 관리자 유저관광지 사진 삭제
	 * @param photoNum
	 */
	@DeleteMapping("/admin/place/photo/{photoNum}")
	public void deleteData(@PathVariable(name="photoNum") int photoNum
			,HttpServletRequest request) {
		// 파일 업로드 경로
		String path = request.getSession().getServletContext().getRealPath("/placeImg");
		System.out.println(path);
		// db에 저장된 파일명들 얻기
		String deleteFile = pps.getData(photoNum).getImage();
		// 저장된 파일들 먼저 삭제
		if(!deleteFile.equals("no")) {
			File file = new File(path +"/"+ deleteFile);
			if(file.exists()) {
				file.delete();
			}
		}
		// db데이터 삭제
		pps.deleteData(photoNum);
	}
	
	/*
	 * 유저관광지 사진 approval=1로 수정
	 * @param photoNum
	 */
	@PutMapping("/admin/place/photo/{photoNum}")
	public void approvePhoto(@PathVariable(name="photoNum") int photoNum) {
		pps.approvePhoto(photoNum);
	}
		

	@Data
	@AllArgsConstructor
	static class JsonAnswer<T>{

		private T answer;
		int totalPage;
	}

	@Data
	@AllArgsConstructor
	static class JsonReAnswer<T>{

		private T reAnswer;
		int totalPage;
	}
	
	@Data
	@AllArgsConstructor
	static class JsonData<T> {
		private T notices;
		int totalPage;
	}

	@Data
	@AllArgsConstructor
	static class JsonDataList {
		private NoticeDto noticeDto; //dto
	}

	@Data
	@AllArgsConstructor
	static class JsonDetail {
		private NoticeDto noticeDetail;
	}

	@Data
	@AllArgsConstructor
	static class JsonRequest {
		private String title;
		private String content;
		private int views;
	}
	
	@Data
	@AllArgsConstructor
	static class JsonAdminPhotos {
		private List<PlacePhotoDto> photo;
	}

	

}
