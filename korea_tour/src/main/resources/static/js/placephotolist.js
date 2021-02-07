'use strict';

placePhotoList();

// parameter value 읽기
function getParam(key) {
  let param;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  param = urlParams.get(key);
  return param;
}

function deletePhoto(photoNum){
   const xhr = new XMLHttpRequest();
   const url =`/api/admin/place/photo/${photoNum}`;
 	xhr.open('DELETE',url);
  	
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
			
		    window.location.reload(true);
		  
		}
	}
	xhr.send(null);
    }

function approvalPhoto(photoNum){
	const xhr = new XMLHttpRequest();
    const url =`/api/admin/place/photo/${photoNum}`;
 	xhr.open('PUT',url);
  	
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
			
		    window.location.reload(true);
			
		}
	}
	xhr.send(null);
    }


function placePhotoList(){
    var xhr = new XMLHttpRequest();
    var url = `/api/admin/place/photo`;
    xhr.open('GET', url);
    xhr.send();
    console.log(url);

    xhr.onreadystatechange = function(){
        if (this.readyState == 4) {
	    let data = JSON.parse(this.responseText);
    	let item = data.photo;
            console.log(item);

        let a="";
		for(let i=0;i<item.length;i++){
			if(item[i].approval!=1){
			a+= `<tr class="board_list_row">`
					a+= `<td class="board_list_data">${i+1}</td>`
						a+= `<td class="board_list_data">${item[i].photoNum}</td>`
					a+=`<td class="board_list_data">${item[i].contentId}</td>`
					a+=`<td class="board_list_data"><img src="/placeImg/${item[i].image}" width="120" height="100"></td>`
					a+=`<td class="board_list_data">${item[i].loginId}</td>`
				    a+=`<td class="board_list_data num"  num="${item[i].photoNum}"><button type="button" class="delete-btn">삭제</button></td>`

					a+=`<td class="board_list_data num"  num="${item[i].photoNum}"><button type="button" class="approval-btn">승인</button></td>`

		}}
		
	document.querySelector(".list_row").innerHTML=a;
	}
	const delBtns = document.querySelectorAll(".delete-btn");
	for(const btn of delBtns){
	btn.addEventListener("click",function(){
	const photoNum=btn.parentElement.getAttribute("num");
 	deletePhoto(photoNum);
})      
}

	const approvalBtns = document.querySelectorAll(".approval-btn");
	for(const btn of approvalBtns){
	btn.addEventListener("click",function(){
		
	 const photoNum=btn.parentElement.getAttribute("num");

 approvalPhoto(photoNum);
})
}    

}
}


