'use strict';

let perBlock = 5;
let currentPage = getParam("currentPage")
let startPage = Math.floor((currentPage - 1) / perBlock) * perBlock + 1;
let endPage = startPage + perBlock - 1;

recommentList(currentPage);

// parameter value 읽기
function getParam(key) {
  let param;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  param = urlParams.get(key);
  return param;
}



function redeleteComment(tourAnswerNum){
    const xhr = new XMLHttpRequest();
    const url =`/api/admin/answer/${tourAnswerNum}`;
    xhr.open('POST', url);

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 2) {
			
			console.log("123");
		    window.location.reload(true);
			
		  
		
		  
		}
	}
	xhr.send(null);
    }


function recommentList(currentPage){
    var xhr = new XMLHttpRequest();
    var url = `/api/admin/reanswer/${currentPage}`;
    xhr.open('GET', url);
    xhr.send();
    console.log(url);

    xhr.onreadystatechange = function(){
        if (this.readyState == 4) {
	    let data = JSON.parse(this.responseText);
    	let item = data.reAnswer;
            console.log(item);

        let a="";
		for(let i=0;i<item.length;i++){
			if(item[i].deleted!=2){
			a+= `<tr class="board_list_row">`
					a+= `<td class="board_list_data">${i+1}</td>`
				    a+= `<td class="board_list_data">${item[i].tourAnswerNum}</td>`
					a+= `<td class="board_list_data">${item[i].contentId}</td>`
					a+=`<td class="board_list_data">${item[i].content}</td>`
					a+=`<td class="board_list_data">${item[i].loginId}</td>`
					
					a+=`<td class="board_list_data">${item[i].writeDay}</td>`
					a+=`<td class="board_list_data num"  num="${item[i].tourAnswerNum}"><button type="button" class="delete-btn">삭제</button></td>`
		}}
	document.querySelector(".list-low").innerHTML=a;
	
	 const totalPage = data.totalPage; //
      if (endPage > totalPage) {
        endPage = totalPage;
      }
     
      let p = '';
      if (startPage > 1) {
        p += `<li class='page-list'><a href='/admin/recomment/list?currentPage=${
          startPage - 1
        }'><i class="fas fa-chevron-left"></i></li>`;
      }
      for (let i = startPage; i <= endPage; i++) {
        p += `<li class='page-list'><a href='/admin/recomment/list?currentPage=${i}'>${i}</a></li>`;
      }
      if (endPage < totalPage) {
        p += `<li page='${
          endPage + 1
        }' class='page-list'><a href='/admin/recomment/list?currentPage=${
          endPage + 1
        }'><i class="fas fa-chevron-right"></i></a></li>`;
      }
      document.querySelector('.page_nation').innerHTML = p;

    const delBtns = document.querySelectorAll(".delete-btn");

for(const btn of delBtns){
	btn.addEventListener("click",function(){
		
	 const tourAnswerNum=btn.parentElement.getAttribute("num");
console.log(tourAnswerNum)
 redeleteComment(tourAnswerNum);
})
}    
}

}
}           



