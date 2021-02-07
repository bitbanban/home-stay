package com.bitcamp.korea_tour.model;

import lombok.Data;

@Data
public class PagingDto {
	private int currentPage;
	private int startPage;
	private int endPage;
	private int totalCount;
	private int totalPage;
	private int perPage;
	private int perBlock;
	private int start;
	private int end;
}
