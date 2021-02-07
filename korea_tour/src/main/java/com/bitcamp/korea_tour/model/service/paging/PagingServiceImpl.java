package com.bitcamp.korea_tour.model.service.paging;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bitcamp.korea_tour.model.PagingDto;

import lombok.AllArgsConstructor;

@Service
public class PagingServiceImpl implements PagingService {

	private int perPage; // 한페이지당 보여질 글의 갯수
	private int start; // 각 블럭당 불러올 글의 시작번호
	private int totalPage; // 총 페이지의 갯수
	
	@Override
	public Map<String, Integer> getPagingData(int totalCount, int currentPage) {

		// mysql은 첫글이 0번(오라클은 1번)
		perPage=10;
		start = (currentPage-1)*perPage;
		totalPage=totalCount/perPage + (totalCount%perPage>0?1:0);;

		Map<String, Integer> paging=new HashMap<String, Integer>();
		paging.put("start", start);
		paging.put("perPage", perPage);
		paging.put("totalPage", totalPage);
		return paging;		
	}
	
	@Override
	public int getPagingStart(int currentPage, int perPage) {
		// mysql은 첫글이 0번(오라클은 1번)
		start = (currentPage-1)*perPage;
		return start;	
	}
	
	@Override
	public int getPagingTotalPage(int totalCount, int perPage) {
		totalPage=totalCount/perPage + (totalCount%perPage>0?1:0);
		return totalPage;
	}

}
