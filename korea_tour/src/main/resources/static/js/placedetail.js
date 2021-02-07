'use strict';

let link = document.location.href;
let contentId = link.split('=');
let id = contentId[1];
let regroupId;

window.onload=function(){

let ConId= document.getElementById("placeContent");
ConId.value=id;

}

getPlace();
//출력
function getPlace() {

  let xhr = new XMLHttpRequest();
  let url = `/api/place/detail/` + id;
  xhr.open('GET', url);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      let data = JSON.parse(this.responseText);
      let item = data.place;
      let src = item.firstImage;
      let photo = data.apiPhoto;
      let placeName = item.title;
      let addr = item.addr1;
      let overview = item.overview;
      let xpos = item.mapX;
      let ypos = item.mapY;
      let UsNum;
      let str;
      //유저 사진
      let userPhoto = data.userPhoto;

      //댓글출력
      let Answer = data.tourAnswer;
     


      let userLike;
      let userMark;
      if (data.userMark == null) {
        userMark = 'unset';
      } else {
        userMark = 'favorite';
      }

      if (data.userLike == null) {
        userLike = 'unset';
      } else {
        userLike = 'liked';
      }


      let w = ' ';
      let y = ' ';
      let t = ' ';
      let q = ' ';
      let u = ' ';
      //관광지 이름
      w += `<h1>${placeName}</h1>`;
      

      //t += `<div id="heart" data-id="${userLike}" class="${userLike}" onclick="updateLike()"><div class="heart"></div></div>`;
      //t += `<span id="favorite" data-id="${userMark}" class="${userMark}" onclick="updateFavorite()"><i class="fas fa-star"></i></span>`;
      
      //상단 이미지(DB저장)
      y += `<img id="mainImage" src=${src} onerror="this.src='/img/noimage.png'">`;
      if (src != null) {
        y += `<p id="showImage" onclick='imageClick()'>이미지 더보기</p><div id=subImage>`;

        for (let i = 0; i < photo.length; i++) {
          y += `<img class="sub-image" src=${photo[i].originImgUrl} onerror="this.src='/img/noimage.png'">`;
        }
      }


      //글내용
      t += `<p>주소 : ${addr}</p><br>`;
      t += `<p>${overview}</p>`;

      //유저사진
      t += `<div id="userPicture">`;
      for (let b = 0; b < userPhoto.length; b++) {
        t += `<img class="userPhoto" src="/placeImg/${userPhoto[b].image}">`;
        console.log(userPhoto[b].image);
  
      }
      t += `</div>`;

        UsNum =document.getElementById("uNum");
        if (UsNum != null) 
         str = UsNum.value;
        
        else 
         str = null;

       for (let d = 0; d < Answer.length; d++) {
	    
        
        if(Answer[d].relevel == 0 && Answer[d].deleted == 0) {
	    //댓글
        u += `<div class="Answer">`;
        if(str==Answer[d].loginNum){
           u += `<i class="fas fa-trash-alt" id=${Answer[d].tourAnswerNum} onclick="deleteAnswer(this)"></i>`
	    }
        u += `<img id="loginPhoto" src=${Answer[d].loginPhoto}>`;
        u += `<p id="loginId">${Answer[d].loginId}</p>`;
        
        u += `<p id="content">${Answer[d].content}</p>`;
        u += `<p id="day">${Answer[d].writeDay}</p>`;
        u += `<input type="hidden" class="Rerestep" th:value=${Answer[d].restep}></input>`;
        u += `</div>`;
        
       


        //답글 입력기
        if(str != null) {
        u += `<i class="fas fa-comment-alt ReAnswerClick" id=${Answer[d].regroup}></i>`;
        u += `<div class="ReAnswer-List" id="reAnswer${Answer[d].tourAnswerNum}">`;
        u += `<textarea class="ReContent" name="Recontent" onblur="ReforceOut(this.value)"></textarea>`;
        u += `<button class="insertRe" onclick="insertReAnswer()">보내기</button>`;
        u += `</div>`;
         }
        }else if(Answer[d].relevel != 0 && Answer[d].deleted == 0){
	     u+= `<div class=ReAnswer>`
	      if(str==Answer[d].loginNum){
	         u += `<i class="fas fa-trash-alt" id=${Answer[d].tourAnswerNum} onclick="deleteAnswer(this)"></i>`;
	       }
         u += `<img id="loginPhoto" src=${Answer[d].loginPhoto}>`;
         u += `<p id="loginId">${Answer[d].loginId}</p>`;
         u += `<p id="content">${Answer[d].content}</p>`;
         u += `<p id="day">${Answer[d].writeDay}</p>`;
         u += `</div>`
         }else if(Answer[d].relevel != 0 && Answer[d].deleted == 1){
	     u+= `<div class="ReAnswer">`;
         u+= `<img id="loginPhoto" src=${Answer[d].loginPhoto}>`;
         u+= `<p id="loginId">${Answer[d].loginId}</p>`;
	     u+= `<div class="deleteUser">`;      
         u+= `<div>사용자가 삭제한 답글입니다</div>`;
         u+= `<input type="hidden" id=${Answer[d].tourAnswerNum}></div>`;
         u+= `</div>`;
         }else if(Answer[d].relevel == 0 && Answer[d].deleted == 1){
	     u+= `<div class="Answer">`;
	     u += `<img id="loginPhoto" src=${Answer[d].loginPhoto}>`;
         u += `<p id="loginId">${Answer[d].loginId}</p>`;
         u+= `<div class="deleteUser">`;      
         u+= `<div>사용자가 삭제한 댓글입니다</div>`;
         u+= `<input type="hidden" id=${Answer[d].tourAnswerNum}></div>`;
         u+= `</div>`;
         }else if(Answer[d].relevel != 0 && Answer[d].deleted == 2){
	     u+= `<div class="ReAnswer">`;
         u += `<img id="loginPhoto" src=${Answer[d].loginPhoto}>`;
         u += `<p id="loginId">${Answer[d].loginId}</p>`;
	     u+= `<div class="deleteAdmin">`;
         u+= `<div>관리자가 삭제한 답글입니다</div>`
         u+= `<input type="hidden" id=${Answer[d].tourAnswerNum}></div>`;
         u+= `</div>`;
         }else if(Answer[d].relevel == 0 && Answer[d].deleted == 2){
	     u+= `<div class="Answer">`;
         u += `<img id="loginPhoto" src=${Answer[d].loginPhoto}>`;
         u += `<p id="loginId">${Answer[d].loginId}</p>`; 
	     u+= `<div class="deleteAdmin">`;
         u+= `<div>관리자가 삭제한 댓글입니다</div>`
         u+= `<input type="hidden" id=${Answer[d].tourAnswerNum}></div>`;
         u+= `</div>`;
         }
      }



      //좋아요,즐겨찾기 
      const liked= document.querySelector("#heart")
      const favorite=document.querySelector("#favorite")

      liked.setAttribute("data-id",userLike);
      liked.classList.add(userLike);
      favorite.setAttribute("data-id",userMark);
      favorite.classList.add(userMark);
      
      document.querySelector('#placeName').innerHTML = w;
      document.querySelector('#picture').innerHTML = y;
      document.querySelector('#placeInfo').innerHTML = t;
      //console.log(document.querySelector('#userPicture'));
     // document.querySelector('#userPicture').innerHTML = q;
      document.querySelector('#answerList').innerHTML = u;
     
      const ReClick=document.querySelectorAll(".ReAnswerClick");
      for(const ReAnswerClick of ReClick){ //대댓글 버튼 각각에 이벤트 주기위해서 for 문 돌리기
      ReAnswerClick.addEventListener("click",	()=>{ //대댓글 버튼을 클릭했을때 
      ReAnswerClick.nextElementSibling.classList.toggle("active");    
      regroupId = ReAnswerClick.getAttribute("id");
       })
      } // for문끝 
      // document.querySelector('#heart').addEventListener('click', e => {
      //   updateLike();
      // });
      // document.querySelector('#favorite').addEventListener('click', e => {
      //   updateFavorite();
      // });


      // //지도

      var mapContainer = document.getElementById('placeMap'), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(ypos, xpos), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      // 마커가 표시될 위치입니다
      var markerPosition = new kakao.maps.LatLng(ypos, xpos);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    }
  };
  xhr.send();
}
//이미지 보이기

const imageClick = () => {
  let subPhoto = document.getElementById('subImage');
  if (subPhoto.style.display == 'block')
    return (subPhoto.style.display = 'none');
  else return (subPhoto.style.display = 'block');
};


function updateLike() {
  //const contentId = document.querySelector('#hiddenPlaceId').getAttribute('value');
  const liked = document.querySelector('#heart');
  const status = liked.getAttribute('data-id');
  const xhr = new XMLHttpRequest();
  if (status == 'liked') {
    const url = `/api/place/detail/like/delete/${id}`;
    xhr.open('DELETE', url);
  } else {
    const url = `/api/place/detail/like/${id}`;
    xhr.open('POST', url);
  }
  //xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(null);

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      // console.log(xhr.responseText);
      const msg = xhr.responseText;
      if (msg == 'needlogin') {
        alert('로그인후 이용할 수 있습니다');
 console.log('Error!' + xhr.responseText);
      }

      if (status == 'liked') {
        liked.setAttribute('data-id', 'unset');
        liked.classList.remove('liked');
 console.log('Error!' + xhr.responseText);
      } else {
        liked.setAttribute('data-id', 'liked');
        liked.classList.add('liked');
 console.log('Error!' + xhr.responseText);
      }
    } else {
      console.log('Error!' + xhr.responseText);
    }
  };
}

function updateFavorite() {
 // const contentId = document.querySelector('#hiddenPlaceId').getAttribute('value');
  const favorited = document.querySelector('#favorite');
  const status = favorited.getAttribute('data-id');
  const xhr = new XMLHttpRequest();
  if (status == 'favorite') {
    const url = `/api/place/detail/mark/delete/${id}`;
    xhr.open('DELETE', url);
  } else if (status == 'unset') {
    const url = `/api/place/detail/mark/${id}`;
    xhr.open('POST', url);
  }
  //xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(null);

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      // console.log(xhr.responseText);
      const msg = xhr.responseText;
      if (msg == 'needlogin') {
        alert('로그인후 이용할 수 있습니다');
      }

      if (status == 'favorite') {
        favorited.setAttribute('data-id', 'unset');
        favorited.classList.remove('favorite');
      } else {
        favorited.setAttribute('data-id', 'favorite');
        favorited.classList.add('favorite');
      }
    } else {
      console.log('Error!' + xhr.responseText);
    }
  };
}


let content;
const forceOut =(e)=>{

	content = e;
}

// 댓글입력
function insertAnswer() {
	
let userNum=document.getElementById("uNum").getAttribute("value");
let loginId=document.getElementById("lId").getAttribute("value");
let loginPhoto=document.getElementById("lPhoto").getAttribute("value");

	
	//1.JavaScript를 이용하여 서버로 보내는 HTTP request 인스턴스 생성하기
let xhr = new XMLHttpRequest();
let url = `/api/placeanswer`;
//2.xhr.open(전송방식,url,비동기로 수행될지 (생략가능))
xhr.open('POST', url);
xhr.setRequestHeader('Content-type', 'application/json');
//3.post방식일경우 서버로 보내고 싶은 데이터 적기
//xhr.send('데이터내용');
//ex xhr.send(JSON.stringify({ id: 4, content: 'Angular', completed: true }));
let js ={"contentId":id,"loginNum":userNum,"loginId":loginId,"loginPhoto":loginPhoto,"content":content};
xhr.send(JSON.stringify(js));
location.reload();

//4.서버로 보낸 요청에 대한 응답을 받았을 때 어떤 동작을 할 것인지 정하기
xhr.onreadystatechange = myFunction();

function myFunction(){
// 서버의 응답에 따른 로직을 여기에 작성합니다.
//5-1. 응답준비가 안됐을때 return ,그렇지 않을경우 아래 if 문 수행
if (xhr.readyState !== XMLHttpRequest.DONE) return;
//5-2.http 상태코드에 따른 로직 작성 
if(xhr.status === 201) { // 201: post 일경우 Created
   console.log(id,userNum,loginId,loginPhoto,content);
   
  } else {
    console.log("Error!");
  }
 }
}

let RContent;
const ReforceOut =(e)=>{
	document.querySelectorAll('.ReContent').value;
	
	const ReeContent=document.querySelectorAll(".ReContent");
    for(const ReContent of ReeContent){ 
    ReContent.addEventListener("click",	()=>{
    RContent = ReContent.value;
    
  })
  RContent = e;
} 
}





 


// 답글입력
function insertReAnswer() {

let userNum=document.getElementById("uNum").getAttribute("value");
let loginId=document.getElementById("lId").getAttribute("value");
let loginPhoto=document.getElementById("lPhoto").getAttribute("value");

let restepId;

 const insertRestepId=document.querySelectorAll(".insertRe"); //  queryselectorAll로  모든 입력버튼 선택
  for(const insertRe of insertRestepId){ //답글 입력 버튼 각각에 이벤트 주기위해서 for 문 돌리기
  insertRe.addEventListener("click",	()=>{ //답글 입력버튼을 클릭했을때
  restepId = insertRe.lastChild.getAttribute("value"); //맨마지막 자식 노드의 restep값 가져오기
  if(restepId = undefined) 
  restepId=0;
  })
}


	//1.JavaScript를 이용하여 서버로 보내는 HTTP request 인스턴스 생성하기
let xhr = new XMLHttpRequest();
let url = `/api/placereanswer`;
//2.xhr.open(전송방식,url,비동기로 수행될지 (생략가능))
xhr.open('POST', url);
xhr.setRequestHeader('Content-type', 'application/json');
//3.post방식일경우 서버로 보내고 싶은 데이터 적기
//xhr.send('데이터내용');
//ex xhr.send(JSON.stringify({ id: 4, content: 'Angular', completed: true }));
let ReAn ={"contentId":id,"loginNum":userNum,"loginId":loginId,"loginPhoto":loginPhoto,"content":RContent,"regroup":regroupId,"restep":restepId};
xhr.send(JSON.stringify(ReAn));
console.log(id,userNum,loginId,loginPhoto,RContent,regroupId,restepId);
location.reload();

//4.서버로 보낸 요청에 대한 응답을 받았을 때 어떤 동작을 할 것인지 정하기
xhr.onreadystatechange = myFunction();

function myFunction(){
// 서버의 응답에 따른 로직을 여기에 작성합니다.
//5-1. 응답준비가 안됐을때 return ,그렇지 않을경우 아래 if 문 수행
if (xhr.readyState !== XMLHttpRequest.DONE) return;
//5-2.http 상태코드에 따른 로직 작성 
if(xhr.status === 201) { // 201: post 일경우 Created
   console.log(id,userNum,loginId,loginPhoto,RContent,regroupId,restepId);
   
  } else {
    alert("로그인 후 입력해 주세요!!")
  }
 }
}



//유저사진 출력

const open = () => {
	let UsNum =document.getElementById("uNum");
    if (UsNum != null) {
    document.querySelector(".user-modal").classList.remove("hidden");
    }
    const userNum = document.querySelector('span#num').getAttribute('data-id');
    if (userNum == 'out') return alert('로그인후 이용가능합니다');
  }

const close = () => {
   document.querySelector(".user-modal").classList.add("hidden");
  }
  document.querySelector("#updatePhoto").addEventListener("click", open);
  document.querySelector(".closeBtn").addEventListener("click", close);
  document.querySelector(".bg").addEventListener("click", close);

//저장후 페이지 이동
const insertUserPicture = () => {
	alert("신청이 완료되었습니다");
}

// 댓글삭제



function deleteAnswer(k) {
	//1.JavaScript를 이용하여 서버로 보내는 HTTP request 인스턴스 생성하기
let tourAnNum = k.getAttribute("id")
let xhr = new XMLHttpRequest();
let url = '/api/tourmypage/answer/'+tourAnNum;
//2.xhr.open(전송방식,url,비동기로 수행될지 (생략가능))
xhr.open('POST', url);
   xhr.onreadystatechange = function(){
            if (this.readyState == 4) {
                location.href = location.href;
            }
          }
          xhr.send();
          location.reload();
        } 
