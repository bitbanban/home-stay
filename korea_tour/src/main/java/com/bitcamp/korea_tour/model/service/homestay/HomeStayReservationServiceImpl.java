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
	public List<JoinHomeStayReservationDto> getAllDatas(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getAllDatas(loginNum);
	}

	@Override
	public List<JoinHomeStayReservationDto> getDatasByWating(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getDatasByWating(loginNum);
	}

	@Override
	public List<JoinHomeStayReservationDto> getDatasByCancel(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getDatasByCancel(loginNum);
	}

	@Override
	public List<JoinHomeStayReservationDto> getDatasByApproved(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getDatasByApproved(loginNum);
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
	public List<JoinMypageReviewWithPhotoDto> getDoneReservationsByUser(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getDoneReservationsByUser(loginNum);
	}

	@Override
	public int getTotalCountOfReservationsForReview(int loginNum) {
		// TODO Auto-generated method stub
		return mapper.getTotalCountOfReservationsForReview(loginNum);
	}
	
	@Override
	public void updateReviewWrite(int homeStayReservationNum) {
		// TODO Auto-generated method stub
		mapper.updateReviewWrite(homeStayReservationNum);
	}
	
	@Override
	public void insertMyReservation(HomeStayReservationDto dto) {
		// TODO Auto-generated method stub
		mapper.insertMyReservation(dto);
	}

}
