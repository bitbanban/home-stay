package com.bitcamp.korea_tour.model.service.homestay;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.homestay.HomeStayReservationDto;
import com.bitcamp.korea_tour.model.homestay.JoinHomeStayReservationDto;
import com.bitcamp.korea_tour.model.homestay.JoinHomeStaySummary;
import com.bitcamp.korea_tour.model.homestay.JoinMypageReviewWithPhotoDto;
import com.bitcamp.korea_tour.model.homestay.JoinReservationDetail;
import com.bitcamp.korea_tour.model.mapper.HomeStayReservationMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeStayReservationServiceImpl implements HomeStayReservationService{

	private final HomeStayReservationMapper mapper;

	@Override
	public int getTotalCount(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getTotalCount(loginNum);
	}

	@Override
	public int getCountByWating(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getCountByWating(loginNum);
	}

	@Override
	public int getCountByCancel(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getCountByCancel(loginNum);
	}

	@Override
	public int getCountByApproved(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getCountByApproved(loginNum);
	}

	@Override
	public List<JoinHomeStayReservationDto> getAllDatas(HashMap<String, Object> map) {
		// TODO Auto-generated method stub
		return mapper.getAllDatas(map);
	}

	@Override
	public List<JoinHomeStayReservationDto> getDatasByWating(HashMap<String, Object> map) {
		// TODO Auto-generated method stub
		return mapper.getDatasByWating(map);
	}

	@Override
	public List<JoinHomeStayReservationDto> getDatasByCancel(HashMap<String, Object> map) {
		// TODO Auto-generated method stub
		return mapper.getDatasByCancel(map);
	}

	@Override
	public List<JoinHomeStayReservationDto> getDatasByApproved(HashMap<String, Object> map) {
		// TODO Auto-generated method stub
		return mapper.getDatasByApproved(map);
	}

	@Override
	public JoinHomeStaySummary getHomeStaySummary(int homeStayReservationNum) {
		// TODO Auto-generated method stub
		return mapper.getHomeStaySummary(homeStayReservationNum);
	}

	@Override
	public JoinReservationDetail getHomeStayDetail(int homeStayReservationNum) {
		// TODO Auto-generated method stub
		return mapper.getHomeStayDetail(homeStayReservationNum);
	}

	@Override
	public void cancelReservationByUser(int homeStayReservationNum) {
		// TODO Auto-generated method stub
		mapper.cancelReservationByUser(homeStayReservationNum);
	}

	@Override
	public HomeStayReservationDto getData(int homeStayReservationNum) {
		// TODO Auto-generated method stub
		return mapper.getData(homeStayReservationNum);
	}

	@Override
	public List<JoinMypageReviewWithPhotoDto> getDoneReservationsByUser(HashMap<String, Object> map) {
		// TODO Auto-generated method stub
		return mapper.getDoneReservationsByUser(map);
	}

	@Override
	public int getTotalCountOfReservationsForReview(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getTotalCountOfReservationsForReview(loginNum);
	}

	@Override
	public int checkReviewWritten(JoinMypageReviewWithPhotoDto dto) {
		// TODO Auto-generated method stub
		return mapper.checkReviewWritten(dto);
	}
	
	@Override
	public void insertMyReservation(HomeStayReservationDto dto) {
		// TODO Auto-generated method stub
		mapper.insertMyReservation(dto);
	}
	
}
