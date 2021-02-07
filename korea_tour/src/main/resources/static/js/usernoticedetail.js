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
			a+= `<div></div>`
			a+= `<div>작성날짜: ${item.writeDay}</div>`
			a+= `<div>조회수: ${item.views}</div>`
			a+= `<div>제목: ${item.title}</div>`
			a+= `<div>내용: ${item.content}</div>`
			a+=` <button type="button" onclick="history.back()" class="button button-small button-green">돌아가기</button>`
			


		}
	document.querySelector(".column-full-content").innerHTML=a;
  
	}
	}
	}