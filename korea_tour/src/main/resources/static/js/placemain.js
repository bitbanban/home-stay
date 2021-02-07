'use strict';

let areaCode = document.getElementById("mainCity").getAttribute("areaCode");

getMainPlace(areaCode);

//슬라이드 
let slideIndex = 0; //slide index

// HTML 로드가 끝난 후 동작
window.onload=function(){
  showSlides(slideIndex);
  let clickFirst=document.getElementById("cityList");
  clickFirst.click();
  

  // Auto Move Slide
  let sec = 5000;
  setInterval(function(){
    slideIndex++;
    showSlides(slideIndex);

  }, sec);
}


// Next/previous controls
const moveSlides=(n)=> {
  slideIndex = slideIndex + n
  showSlides(slideIndex);
}

// Thumbnail image controls
const currentSlide=(n)=> {
  slideIndex = n;
  showSlides(slideIndex);
}

const showSlides=(n)=> {

  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  let size = slides.length;

  let i="";
  if ((n+1) > size) {
    slideIndex = 0; n = 0;
  }else if (n < 0) {
    slideIndex = (size-1);
    n = (size-1);
  }

  

  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[n].style.display = "block";
  dots[n].className += " active";
}

//슬라이드 끝

//클릭이벤트

const printName=(event)=>{
	
 let thisCity= event.getAttribute("areaCode");
 let mainId = document.getElementById("mainCity");
 let name = event.value;
 mainId.value=(name);
 let hiddenId = document.getElementById("hiddenCity");
 hiddenId.value=(thisCity);
 //let area = event.getAttribute("value");
 //let Mid = mainId.value = (area);

 getMainPlace(thisCity);


 let cityList = document.getElementsByClassName("city-list");

      function handleClick(event) {
        if (event.target.classList.contains === "clicked") {
          event.target.classList.remove("clicked");
        } else {
          for (let i = 0; i < cityList.length; i++) {
            cityList[i].classList.remove("clicked");
          }

          event.target.classList.add("clicked");
        }
      }

      function init() {
        for (let i = 0; i < cityList.length; i++) {
          cityList[i].addEventListener("click", handleClick);
        }
      }

      init();


  
}

//submit버튼 클릭시

const moveList=()=>{
	 let hidden = document.getElementById('hiddenCity').value;
     location.href = '/tourplace/list?areaCode='+hidden+'&currentPage=1';
}

//출력

function getMainPlace(areaCode) {
  var xhr = new XMLHttpRequest();
  var url = `/api/place/main/${areaCode}`;
  console.log(url);
  xhr.open('GET', url);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      let data = JSON.parse(this.responseText);
      let item = data.place;
      let c = ' ';

      for (let i = 0; i < 4; i++) {
        let src = item[i].firstImage;
        let placeName = item[i].title;
        let contentId = item[i].contentId;

        c += `<a href='/tourplace/detail?contentId=${contentId}'><div class="place-list">`;
        c += `<img src=${src} onerror="this.src='/img/noimage.png'">`;
        c += `<div class="list-content">`;
        c += `<div class="placeName">${placeName}</div>`;
        c += `</div></div></a>`;
      }

      document.querySelector('.city-place-menu').innerHTML = c;
      console.log(item);
      console.log(data);
}
}
xhr.send();
}



//ajax

/*

var xhr = new XMLHttpRequest();
  var url = `place/main`;
  console.log(url);
  xhr.open('GET', url);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      let data = JSON.parse(this.responseText);
      let item = data.place;
      let Code = item.filter(function (element) {
	      console.log(element);
          return element.areaCode =="1";	
      })
      console.log(Code);
      let c="";
      for(let i=0; i<item.length;i++) {
	      c += `<div class="place-main-list">`
          let src= item.firstimage;
          c += `<img src=${src}>`
          c += `</div>`
      }
   
       document.querySelector('.city-place-menu').innerHTML = c;
      console.log(item.areaCode);
      console.log(Code.addr1);
      console.log(data);
    }
};
xhr.send();
*/
/*

  
     
      }
     

//1.JavaScript를 이용하여 서버로 보내는 HTTP request 인스턴스 생성하기
const xhr = new XMLHttpRequest();
//2.xhr.open(전송방식,url,비동기로 수행될지 (생략가능))
xhr.open('GET', 'url',true);
//3.post방식일경우 서버로 보내고 싶은 데이터 적기
//xhr.send('데이터내용');
//ex xhr.send(JSON.stringify({ id: 4, content: 'Angular', completed: true }));
xhr.send(JSON.stringify({"place":[{"areaCode":1, "firstImage":String}]}));


//4.서버로 보낸 요청에 대한 응답을 받았을 때 어떤 동작을 할 것인지 정하기
xhr.onreadystatechange = myFunction(data);


function myFunction(data){
// 서버의 응답에 따른 로직을 여기에 작성합니다.

//5-1. 응답준비가 안됐을때 return ,그렇지 않을경우 아래 if 문 수행
if (xhr.readyState !== XMLHttpRequest.DONE) return;

//5-2.http 상태코드에 따른 로직 작성 
if(xhr.status === 200) { // 201: post 일경우 Created
	for(let i=0;i<4; )
  } else {
    console.log("Error!");
  }
}*/


 