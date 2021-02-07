package com.bitcamp.korea_tour.model.service.homestay;


import java.util.List;


import com.bitcamp.korea_tour.model.homestay.HomeStayDetailDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayPhotoDto;
import com.bitcamp.korea_tour.model.homestay.HomeStayReservationDto;

public interface HomeStayService {
	HomeStayDto getHomeStayNameAndAddr(int homeStayNum);
	int countOfHouseAnswer(int homeStayNum);
	double avgOfCleanliness(int homeStayNum);
	double avgOfCommunication(int homeStayNum);
	double avgOfCheckIn(int homeStayNum);
	double avgOfAccuracy(int homeStayNum);
	double avgOfLocation(int homeStayNum);
	double avgOfSatisfactionForPrice(int homeStayNum);
	List<HomeStayPhotoDto> getHomeStayPhoto(int homeStayNum);
	String getHomeStayContent(int homeStayNum);
	HomeStayDetailDto getHomeStayFacility(int homeStayNum);
	HomeStayDto getHomeStayMap(int homeStayNum);
	int getHomeStayMaxPeople(int homeStayNum);
	List<HomeStayReservationDto> getDayImpossible(int homeStayNum);
	String getHostName(int homeStayNum);
	int getHomeStayPrice(int homeStayNum);
}
