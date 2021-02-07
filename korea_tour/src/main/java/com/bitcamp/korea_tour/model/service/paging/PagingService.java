package com.bitcamp.korea_tour.model.service.paging;

import java.util.Map;

public interface PagingService {
	
	/*
	 페이징 필요한 뷰
		1. 코스전체목록((1)최신순/(2)인기순) -`페이징` JoinCourseMapper 
		2. 관광지전체목록((1)가나다순/(2)인기순) -`페이징` JoinPlaceMapper
		3. 코스Nav태그검색목록((1)최신순/(2)인기순) -`페이징` JoinCourseMapper 
		4. 관광지Nav지역검색목록((1)가나다순/(2)인기순) -`페이징` JoinPlaceMapper
		5. 코스통합검색((1)최신순/(2)인기순) -`페이징` JoinCourseMapper 
			{검색어->코스이름, 코스내용, 코스관광지 지역, 코스관광지 이름, 코스관광지 설명}
		6. 관광지통합검색&메인페이지관광지검색((1)가나다순/(2)인기순) -`페이징` JoinPlaceMapper
			{검색어->코스이름, 코스내용, 코스관광지 지역, 코스관광지 이름, 코스관광지 설명}
		10. 마이코스목록(최신순) -`페이징` JoinCourseMapper
		11. 마이즐찾코스목록(최신순) -`페이징` JoinCourseMapper 
		12. 마이즐찾관광지목록(최신순) -`페이징` JoinPlaceMapper
		13. 마이댓글목록(관광지num/ 코스num)  -`페이징` TourAnswerMapper
		14. 마이답글목록(관광지num/ 코스num) -`페이징` TourAnswerMapper
		17. 메인페이지 코스검색목록(and로 모든 코스태그 일치하는 데이터만 출력) -`페이징`  JoinCourseMapper
		23. 사용자 목록
	*/
	Map<String, Integer> getPagingData(int totalCount, int currentPage);
	int getPagingStart(int currentPage, int perPage);
	int getPagingTotalPage(int totalCount, int perPage);
}
