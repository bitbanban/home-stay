'use strict';
let perBlock = 5;
let currentPage = getParam("currentPage")
let startPage = Math.floor((currentPage - 1) / perBlock) * perBlock + 1;
let endPage = startPage + perBlock - 1;

hostList(currentPage); 

// parameter value 읽기
function getParam(key) {
  let param;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  param = urlParams.get(key);
  return param;
}




function hostList(currentPage){
    var xhr = new XMLHttpRequest();
    var url = `/homestays/admin/${currentPage}`;
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
			
					a+= `<td class="board_list_data">${item[i].homeStayNum}</td>`
					a+=`<td class="board_list_data">${item[i].userName}</td>`
					//포트가 달라서 연결이 안됨 추후 수정필요
					a+=`<td class="board_list_data" num="${item[i].homeStayNum}"><a href="/homestay/adminhousedetail/num=${item[i].homeStayNum}">${item[i].title}</td>`
					a+=`<td class="board_list_data">${item[i].addr1}</td>`
		}
	document.querySelector(".list-low").innerHTML=a;
	
	
	
	
	
	 const totalPage = data.totalPage; //
      if (endPage > totalPage) {
        endPage = totalPage;
      }
     
      let p = '';
      if (startPage > 1) {
        p += `<li class='page-list'><a href='/admin/host/list?currentPage=${
          startPage - 1
        }'><i class="fas fa-chevron-left"></i></li>`;
      }
      for (let i = startPage; i <= endPage; i++) {
        p += `<li class='page-list'><a href='/admin/host/list?currentPage=${i}'>${i}</a></li>`;
      }
      if (endPage < totalPage) {
        p += `<li page='${
          endPage + 1
        }' class='page-list'><a href='/admin/host/list?currentPage=${
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


