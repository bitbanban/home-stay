package com.bitcamp.korea_tour.model.service.homestay;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.homestay.HomeStayDetailDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayReservationDto;
import com.bitcamp.korea_tour.model.homestay.JoinHomeStayDetailDto;
import com.bitcamp.korea_tour.model.mapper.HomeStayHostMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeStayHostServiceImpl implements HomeStayHostService {

	private final HomeStayHostMapper mapper;


	@Override
	public void insertHomeStay(JoinHomeStayDetailDto dto) {
		// TODO Auto-generated method stub
		mapper.insertHomeStay(dto);
	}

	@Override
	public void insertHomeStayDetail(int homeStayNum, JoinHomeStayDetailDto dto) {
		// TODO Auto-generated method stub
		Map<String,Object> map=new HashMap<String, Object>();
		map.put("homeStayNum", homeStayNum);
		map.put("dto", dto);
		mapper.insertHomeStayDetail(map);
	}
	
	@Override
	public int getTotalCount(int homestayNum) {
		// TODO Auto-generated method stub
		return mapper.getTotalCount(homestayNum);
	}

	@Override
	public List<HomeStayReservationDto> getAllReservation(int homestayNum,int approval, int start, int perPage) {
		// TODO Auto-generated method stub
		Map<String,Object> map=new HashMap<String, Object>();
		map.put("homestayNum", homestayNum);
		map.put("approval", approval);
		map.put("start", start);
		map.put("perPage", perPage);
		List<HomeStayReservationDto> list = mapper.getAllReservation(map);
		return list;
	}

	@Override
	public HomeStayReservationDto getReservation(int homeStayReservationNum) {
		// TODO Auto-generated method stub
		return mapper.getReservation(homeStayReservationNum);
	}

	@Override
	public int getApprovalCount(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.getApprovalCount(homeStayNum);
	}

	@Override
	public List<HomeStayReservationDto> getApprovalReservation(int homeStayNum, int start, int perPage) {
		// TODO Auto-generated method stub
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("homeStayNum", homeStayNum);
		map.put("Start", start);
		map.put("perPage", perPage);
		List<HomeStayReservationDto> list = mapper.getApprovalReservation(map);
		return list;
	}

	@Override
	public int getRefusedCount(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.getRefusedCount(homeStayNum);
	}

	@Override
	public List<HomeStayReservationDto> getRefusedReservation(int homeStayNum, int start, int perPage) {
		// TODO Auto-generated method stub
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("homeStayNum", homeStayNum);
		map.put("Start", start);
		map.put("perPage", perPage);
		List<HomeStayReservationDto> list = mapper.getRefusedReservation(map);
		return list;
	}

	@Override
	public int getPendingCount(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.getPendingCount(homeStayNum);
	}

	@Override
	public List<HomeStayReservationDto> getPendingReservation(int homeStayNum, int start, int perPage) {
		// TODO Auto-generated method stub
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("homeStayNum", homeStayNum);
		map.put("Start", start);
		map.put("perPage", perPage);
		List<HomeStayReservationDto> list = mapper.getPendingReservation(map);
		return list;
	}

	@Override
	public void updateApproval(int homeStayReservationNum, int approval) {
		// TODO Auto-generated method stub
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("homeStayReservationNum", homeStayReservationNum);
		map.put("approval", approval);
		
		mapper.updateApproval(map);
		
	}

	@Override
	public int getHomeStayNum() {
		// TODO Auto-generated method stub
		return mapper.getHomeStayNum();
	}

	@Override
	public int getUserNum(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.getUserNum(homeStayNum);
	}

	@Override
	public int getHomeStayNum2(int userNum) {
		// TODO Auto-generated method stub
		return mapper.getHomeStayNum2(userNum);
	}

	@Override
	public void updateHomeStay(JoinHomeStayDetailDto dto,int homeStayNum) {
		// TODO Auto-generated method stub
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("homeStayNum", homeStayNum);
		map.put("dto", dto);
		
		mapper.updateHomeStay(map);
	}

	@Override
	public void updateHomeStayDetail(JoinHomeStayDetailDto dto,int homeStayNum) {
		// TODO Auto-generated method stub
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("homeStayNum", homeStayNum);
		map.put("dto", dto);
		
		mapper.updateHomeStayDetail(map);
	}

	@Override
	public JoinHomeStayDetailDto getHomeStayData(int userNum) {
		// TODO Auto-generated method stub
		return mapper.getHomeStayData(userNum);
	}

	@Override
	public JoinHomeStayDetailDto getHomeStayDetailData(int userNum) {
		// TODO Auto-generated method stub
		return mapper.getHomeStayDetailData(userNum);
	}

	@Override
	public JoinHomeStayDetailDto getHomeStayAllData(int userNum) {
		// TODO Auto-generated method stub
		return mapper.getHomeStayAllData(userNum);
	}



}