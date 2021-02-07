package com.bitcamp.korea_tour.model.service.homestay;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.homestay.HomeStayDetailDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayPhotoDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayReservationDto;
import com.bitcamp.korea_tour.model.mapper.HomeStayMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeStayServiceImpl implements HomeStayService{
	private final HomeStayMapper mapper;
	
	@Override
	public HomeStayDto getHomeStayNameAndAddr(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.getHomeStayNameAndAddr(homeStayNum);
	}

	@Override
	public int countOfHouseAnswer(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.countOfHouseAnswer(homeStayNum);
	}

	@Override
	public double avgOfCleanliness(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.avgOfCleanliness(homeStayNum);
	}

	@Override
	public double avgOfCommunication(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.avgOfCommunication(homeStayNum);
	}

	@Override
	public double avgOfCheckIn(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.avgOfCheckIn(homeStayNum);
	}

	@Override
	public double avgOfAccuracy(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.avgOfAccuracy(homeStayNum);
	}

	@Override
	public double avgOfLocation(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.avgOfLocation(homeStayNum);
	}

	@Override
	public double avgOfSatisfactionForPrice(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.avgOfSatisfactionForPrice(homeStayNum);
	}

	@Override
	public List<HomeStayPhotoDto> getHomeStayPhoto(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.getHomeStayPhoto(homeStayNum);
	}

	@Override
	public String getHomeStayContent(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.getHomeStayContent(homeStayNum);
	}

	@Override
	public HomeStayDetailDto getHomeStayFacility(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.getHomeStayFacility(homeStayNum);
	}

	@Override
	public HomeStayDto getHomeStayMap(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.getHomeStayMap(homeStayNum);
	}

	@Override
	public int getHomeStayMaxPeople(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.getHomeStayMaxPeople(homeStayNum);
	}

	@Override
	public List<HomeStayReservationDto> getDayImpossible(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.getDayImpossible(homeStayNum);
	}

	@Override
	public String getHostName(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.getHostName(homeStayNum);
	}

	@Override
	public int getHomeStayPrice(int homeStayNum) {
		// TODO Auto-generated method stub
		return mapper.getHomeStayPrice(homeStayNum);
	}
	
	
}
