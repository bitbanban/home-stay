'use strict';
let perBlock = 5;
let currentPage = getParam("currentPage")
let startPage = Math.floor((currentPage - 1) / perBlock) * perBlock + 1;
let endPage = startPage + perBlock - 1;

memberList(currentPage); 

// parameter value 읽기
function getParam(key) {
  let param;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  param = urlParams.get(key);
  return param;
}




function deleteMember(userNum){
    const xhr = new XMLHttpRequest();
  
    const url =`/api/admin/member/${userNum}`
  
    xhr.open('DELETE', url);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
     
		window.location.reload(true);
  
 }
}
xhr.send(null);
}




function memberList(currentPage){
    var xhr = new XMLHttpRequest();
    var url = `/api/admin/users/${currentPage}`;
    xhr.open('GET', url);
    xhr.send();
    console.log(url);

    xhr.onreadystatechange = function(){
        if (this.readyState == 4) {
	    let data = JSON.parse(this.responseText);
    	let item = data.list;
            console.log(item);

        let a="";
		for(let i=0;i<item.length;i++){
			a+= `<tr class="board_list_row">`
			
						a+= `<td class="board_list_data" id="memberNum">${item[i].userNum}</td>`
					a+=`<td class="board_list_data">${item[i].name}</td>`
					a+=`<td class="board_list_data"><img src="${item[i].photo}" style="width:60px;height:60px;border-radius:50%;"></td>`
					a+=`<td class="board_list_data num"  num="${item[i].userNum}"><button type="button" class="delete-btn">강퇴</button></td>`
		}
	document.querySelector(".list-low").innerHTML=a;
	
	
	
	
	
	 const totalPage = data.totalPage; //
      if (endPage > totalPage) {
        endPage = totalPage;
      }
     
      let p = '';
      if (startPage > 1) {
        p += `<li class='page-list'><a href='/admin/member/list?currentPage=${
          startPage - 1
        }'><i class="fas fa-chevron-left"></i></li>`;
      }
      for (let i = startPage; i <= endPage; i++) {
        p += `<li class='page-list'><a href='/admin/member/list?currentPage=${i}'>${i}</a></li>`;
      }
      if (endPage < totalPage) {
        p += `<li page='${
          endPage + 1
        }' class='page-list'><a href='/admin/member/list?currentPage=${
          endPage + 1
        }'><i class="fas fa-chevron-right"></i></a></li>`;
      }
      document.querySelector('.page_nation').innerHTML = p;
    }
const delBtns = document.querySelectorAll(".delete-btn");
for(const btn of delBtns){
	btn.addEventListener("click",function(){
	 const userNum=btn.parentElement.getAttribute("num");
 deleteMember(userNum);

 console.log(userNum);

})
}
           
}
}


