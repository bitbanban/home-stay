package com.bitcamp.korea_tour.model.service.homestay;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.homestay.HomeStayDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayListDto;
import com.bitcamp.korea_tour.model.mapper.HomeStayListMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeStayListServiceImpl implements HomeStayListService {
	private final HomeStayListMapper homeStayListMapper;
	
	@Override
	public List<HomeStayListDto> getAllHomeStayList(Map<String, Object> map) {
		return homeStayListMapper.getAllHomeStayList(map);
	}
	
	@Override
	public int getTotalHomeStayList() {
		return homeStayListMapper.getTotalHomeStayList();
	}
	
	@Override
	public String getHomeStayPhotoOfList(int homeStayNum) {
		int homeStayPhotoNum=0;
		if(homeStayListMapper.getHomeStayPhotoNumOfList(homeStayNum)!=null) {
			homeStayPhotoNum=homeStayListMapper.getHomeStayPhotoNumOfList(homeStayNum);
			return homeStayListMapper.getHomeStayPhotoOfList(homeStayPhotoNum);
		}
		return null;
	}
	
	@Override
	public int isMarked(int homeStayNum, @Param("userNum")int loginNum) {
		Map<String, Integer> map=new HashMap<String, Integer>();
		map.put("homeStayNum", homeStayNum);
		map.put("loginNum", loginNum);
		return homeStayListMapper.isMarked(map);
	}
	
	@Override
	public Double getAvgOfStar(int homeStayNum) {
		return homeStayListMapper.getAvgOfStar(homeStayNum);
	}
	
	@Override
	public List<HomeStayDto> getAdminHomeStayList(int start, int perPage) {
		Map<String, Integer> map=new HashMap<String, Integer>();
		map.put("start", start);
		map.put("perPage", perPage);
		return homeStayListMapper.getAdminHomeStayList(map);
	}
	
	@Override
	public int getTotalAdminHomeStayList() {
		return homeStayListMapper.getTotalAdminHomeStayList();
	}
	
	@Override
	public void approveHomeStay(int homeStayNum) {
		homeStayListMapper.approveHomeStay(homeStayNum);
	}
	
	@Override
	public void denyHomeStay(int homeStayNum) {
		homeStayListMapper.denyHomeStay(homeStayNum);
	}
}
