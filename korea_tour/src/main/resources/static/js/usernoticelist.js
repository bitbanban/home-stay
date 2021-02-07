'use strict';
let perBlock = 5;
let currentPage = getParam("currentPage")
let startPage = Math.floor((currentPage - 1) / perBlock) * perBlock + 1;
let endPage = startPage + perBlock - 1;

noticeList(currentPage);

// parameter value 읽기
function getParam(key) {
  let param;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  param = urlParams.get(key);
  return param;
}



function addViews(noticeNum){
	const xhr = new XMLHttpRequest();
    const url =`/api/noticeviews/${noticeNum}`;
 	xhr.open('POST',url);
  	
    xhr.onreadystatechange = function () {
    
			if (this.readyState == 4) {
	  
  
	  
		}
			
		
	}
	xhr.send(null);
    }

	

function noticeList(currentPage){
    var xhr = new XMLHttpRequest();
    var url = `/api/notice/${currentPage}`;
    xhr.open('GET', url);
    xhr.send();
    console.log(url);

    xhr.onreadystatechange = function(){
        if (this.readyState == 4) {
	    let data = JSON.parse(this.responseText);
    	let item = data.notices;
            console.log(item);

        let a="";
		for(let i=0;i<item.length;i++){
			a+= `<tr class="board_list_row">`
					a+= `<td class="board_list_data">${i+1}</td>`
				    a+= `<td class="board_list_data">${item[i].noticeNum}</td>`
					a+= `<td class="board_list_data num" num="${item[i].noticeNum}"><a class="notice-view" href="/notice/detail?noticeNum=${item[i].noticeNum}">${item[i].title}</a></td>`
					a+=`<td class="board_list_data">${item[i].writeDay}</td>`
					a+=`<td class="board_list_data">${item[i].views}</td>`


					
		}
	document.querySelector(".list-low").innerHTML=a;
	
	 const totalPage = data.totalPage; //
      if (endPage > totalPage) {
        endPage = totalPage;
      }
     
      let p = '';
      if (startPage > 1) {
        p += `<li class='page-list'><a href='/noticelist?currentPage=${
          startPage - 1
        }'><i class="fas fa-chevron-left"></i></li>`;
      }
      for (let i = startPage; i <= endPage; i++) {
        p += `<li class='page-list'><a href='/noticelist?currentPage=${i}'>${i}</a></li>`;
      }
      if (endPage < totalPage) {
        p += `<li page='${
          endPage + 1
        }' class='page-list'><a href='/noticelist?currentPage=${
          endPage + 1
        }'><i class="fas fa-chevron-right"></i></a></li>`;
      }
      document.querySelector('.page_nation').innerHTML = p;

const viewLinks = document.querySelectorAll(".notice-view");
for(const view of viewLinks){
	view.addEventListener("click",function(){
		
	 const noticeNum=view.parentElement.getAttribute("num");
	addViews(noticeNum);


 })
           
}


}
}
}
