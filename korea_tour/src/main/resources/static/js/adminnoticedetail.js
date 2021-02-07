'use strict';
let noticeNum = getParam('noticeNum');

function getParam(key) {
  let param;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  param = urlParams.get(key);
  return param;
}


noticeDetailList(noticeNum);


function noticeDetailList(noticeNum){
  	const xhr = new XMLHttpRequest();
   const url =`/api/notice/detail/${noticeNum}`;
 	xhr.open('GET',url);
    console.log(url);
	xhr.send();
	xhr.onreadystatechange = function(){
		console.log(xhr.readyState)
        if (this.readyState == 4) {
	  	let data = JSON.parse(this.responseText);
    	let item = data.noticeDetail;
            console.log(item);

        let a="";{
			a+= `<div class="column-full-title">제목: ${item.title}</div><br>`
			a+= `<div class="column-full-inside">작성날짜: ${item.writeDay} &nbsp;&nbsp; 조회수: ${item.views}</div>`
			a+= `<div class="column-full-content">${item.content}</div>`
			a+=` <button type="button" onclick="location.href='/admin/notice/updateform?noticeNum='+noticeNum" class="notice-up-button" >수정하기</button>&nbsp;`
			a+=` <button type="button" onclick="location.href='/admin/noticelist?currentPage=1'"class="notice-bac-button" >목록으로</button>`


		}
	document.querySelector(".column-full-content").innerHTML=a;
  
	}
	}
	}