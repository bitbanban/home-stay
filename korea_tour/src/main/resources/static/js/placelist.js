'use strict';
let sort = document.getElementById('sortList').getAttribute('value');
let areaCode = getParam('areaCode');
const perBlock = 5;
let currentPage;
let startPage;
let endPage;

getPlace(sort, areaCode, currentPage);

function getParam(key) {
  let param;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  param = urlParams.get(key);
  return param;
}

window.onload = function () {
  let clickFirst = document.getElementById('namelist');
  clickFirst.click();

  areaNumber();
};

const areaNumber = () => {
  let link = decodeURI(document.location.href);
  let linkArr = link.split('=');
  let areaLink = linkArr[1];
  let areaValue = areaLink.split('&');
  if (areaValue[0] == 1) document.getElementById('mainCity').value = '서울';
  else if (areaValue[0] == 2)
    document.getElementById('mainCity').value = '인천';
  else if (areaValue[0] == 3)
    document.getElementById('mainCity').value = '대전';
  else if (areaValue[0] == 4)
    document.getElementById('mainCity').value = '대구';
  else if (areaValue[0] == 5)
    document.getElementById('mainCity').value = '광주';
  else if (areaValue[0] == 6)
    document.getElementById('mainCity').value = '부산';
  else if (areaValue[0] == 7)
    document.getElementById('mainCity').value = '울산';
  else if (areaValue[0] == 8)
    document.getElementById('mainCity').value = '세종특별자치시';
  else if (areaValue[0] == 31)
    document.getElementById('mainCity').value = '경기도';
  else if (areaValue[0] == 32)
    document.getElementById('mainCity').value = '강원도';
  else if (areaValue[0] == 33)
    document.getElementById('mainCity').value = '충청북도';
  else if (areaValue[0] == 34)
    document.getElementById('mainCity').value = '충청남도';
  else if (areaValue[0] == 35)
    document.getElementById('mainCity').value = '경상북도';
  else if (areaValue[0] == 36)
    document.getElementById('mainCity').value = '경상남도';
  else if (areaValue[0] == 37)
    document.getElementById('mainCity').value = '전라북도';
  else if (areaValue[0] == 38)
    document.getElementById('mainCity').value = '전라남도';
  else if (areaValue[0] == 39)
    document.getElementById('mainCity').value = '제주도';
  else document.getElementById('mainCity').value = '전국';
};

const printName = event => {
  let name = event.value;
  document.getElementById('mainCity').value = name;
  areaCode = event.getAttribute('areaCode');

  getPlace(sort, areaCode, currentPage);
};

const choiceList = e => {
  let list = document.getElementsByClassName('list');
  let sortValue = e.getAttribute('value');
  let sortInput = document.getElementById('sortList');
  sort = sortValue;

  getPlace(sort, areaCode, currentPage);
  function handleClick(event) {
    if (event.target.classList.contains === 'choice') {
      event.target.classList.remove('choice');
    } else {
      for (let i = 0; i < list.length; i++) {
        list[i].classList.remove('choice');
      }

      event.target.classList.add('choice');
    }
  }

  function init() {
    for (let i = 0; i < list.length; i++) {
      list[i].addEventListener('click', handleClick);
    }
  }

  init();
};

//디테일페이지 이동
const moveDetail = () => {
  let content = document.querySelectorAll('.place-list').getAttribute('value');
  location.href = '/tourplace/detail?contentId=' + content;
};

//출력
function getPlace(sort, areaCode, currentPage) {
  if (currentPage == undefined) currentPage = 1;
  var xhr = new XMLHttpRequest();
  var url = `/api/places/${sort}/${currentPage}/${areaCode}`;
  console.log(url);
  xhr.open('GET', url);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      let data = JSON.parse(this.responseText);
      let item = data.place;
      let c = ' ';
      for (let i = 0; i < item.length; i++) {
        let src = item[i].firstImage;
        let placeName = item[i].title;
        let addr = item[i].addr1;
        let contentId = item[i].contentId;

        c += `<a href='/tourplace/detail?contentId=${contentId}'><div class="place-list">`;
        if (src != null) {
          c += `<img src=${src} onerror="this.src='/img/noimage.png'">`;
        } else {
          c += `<img src="/img/noimage.png" onerror="this.src='/img/noimage.png'">`;
        }

        c += `<div class="list-content">`;
        c += `<div class="placeName">${placeName}</div>`;
        c += `<div class="addr">${addr}</div>`;
        c += `<div class="likes"><i class="fas fa-heart"></i><span>${item[i].likeCount}</span></div>`;
        c += `</div></div></a>`;
      }

      document.querySelector('#card').innerHTML = c;
      //   console.log(item);
      //   console.log(data);

      //페이징처리
      const totalPage = data.totalPage; //
      startPage = Math.floor((currentPage - 1) / perBlock) * perBlock + 1;
      endPage = startPage + perBlock - 1;
      if (endPage > totalPage) {
        endPage = totalPage;
      }

      let p = '';
      if (startPage > 1) {
        p += `<li class='page-list'  page='${
          startPage - 1
        }'><i class="fas fa-chevron-left"></i></li>`;
      }
      for (let i = startPage; i <= endPage; i++) {
        if (i == currentPage) {
          p += `<li page='${i}' class='page-list active' >${i}</li>`;
        } else {
          p += `<li page='${i}' class='page-list' >${i}</li>`;
        }
      }
      if (endPage < totalPage) {
        p += `<li page='${
          endPage + 1
        }' class='page-list'><i class="fas fa-chevron-right"></i></li>`;
      }

      document.querySelector('#paging').innerHTML = p;
      let pageList = document.querySelectorAll('.page-list');
      for (const page of pageList) {
        page.addEventListener('click', function (e) {
          let pageNum = e.target.getAttribute('page');

          if (totalPage < pageNum) pageNum = totalPage;
          console.log('p' + pageNum);
          getPlace(sort, areaCode, pageNum);
        });
      }
    }
  };
  xhr.send();
}

//상단 슬라이드
let slideUp = (target, duration = 500) => {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    //alert("!");
  }, duration);
};
let slideDown = (target, duration = 500) => {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;

  if (display === 'none') display = 'block';

  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout(() => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
};
let slideToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === 'none') {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
};

// ====

let speedAnimation = 400;
let targetId = document.getElementById('target');

let slideBtnClick = (cl, sl) =>
  document
    .querySelector(cl)
    .addEventListener('click', () => sl(targetId, speedAnimation));

slideBtnClick('.slide-img', slideToggle);
slideBtnClick('.fa-times', slideToggle);

/*
//지역 switch문
let link= decodeURI(document.location.href);
let linkArr=link.split('=');
let areaLink=linkArr[1];
let areaValue=areaLink.split('&');
let area = areaValue[0];
 switch(area) {
  case 1:
    document.getElementById('mainCity').value ="서울특별시";
    break;
  case 2:
    document.getElementById('mainCity').value ="인천";
    break;
  case 3: 
    document.getElementById('mainCity').value ="대전";
    break;
  case 4: 
    document.getElementById('mainCity').value ="대구";
    break;
  case 5:
    document.getElementById('mainCity').value ="광주";
    break;
  case 6: 
    document.getElementById('mainCity').value ="부산";
    break;
  case 7: 
    document.getElementById('mainCity').value ="울산";
    break;
  case 8: 
    document.getElementById('mainCity').value ="세종특별자치시";
    break;
  case 31: 
    document.getElementById('mainCity').value ="경기도";
    break;
  case 32:
    document.getElementById('mainCity').value ="강원도";
    break;
  case 33: 
    document.getElementById('mainCity').value ="충청북도";
    break;
  case 34: 
    document.getElementById('mainCity').value ="충청남도";
    break;
  case 35: 
    document.getElementById('mainCity').value ="경상북도";
    break;
  case 36:
    document.getElementById('mainCity').value ="경상남도";
    break;
  case 37: 
    document.getElementById('mainCity').value ="전라북도";
    break;
  case 38: 
    document.getElementById('mainCity').value ="전라남도";
    break;
  case 39:  
    document.getElementById('mainCity').value ="재주도";
    break; 
  case 100:
    document.getElementById('mainCity').value ="전국";
    break;
}
*/

/*
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
*/

/*if(i.style.display == "none")
{*/

/*}else{
 let preant = document.getElementById("p");
 preant.removeChild(i);
}*/

/*var clickTimes = 0;

       clickTimes++;
       let n = (clickTimes%2)+1
       switch(n) {
           case 1:
              var newSpan = document.createElement("span");
              newSpan.innerHTML = name;
              newSpan.setAttribute("id",name);
              newSpan.setAttribute("th:value",name);
              newSpan.style.backgroundColor="yellow";
              var p = document.getElementById("p"); // <p "id=p"> 태그의 DOM 객체 찾기
              p.appendChild(newSpan);
               break;
           default:
         
                 // 삭제할 ID 정보 찾기
                var target = name.parentNode.getAttribute('name');
                 // 삭제할 element 찾기
                 var field = document.getElementById('name');
                 // #field 에서 삭제할 element 제거하기
                 document.getElementById('p').removeChild(field);
               break;
       }
       //Do something else
}*/

//태그 계속 추가할 수 있는것
//let newSpan = document.createElement("span");
// newSpan.innerHTML = n;
// newSpan.setAttribute("id",n);
// newSpan.setAttribute("th:value",n);
// newSpan.setAttribute("region","");
// newSpan.style.backgroundColor="yellow";
// let p = document.getElementById("p"); // <p "id=p"> 태그의 DOM 객체 찾기
// p.appendChild(newSpan);

// let n;
// let x  =document.getElementById("mainCity").value.split(" ");
//if(!document.getElementById("mainCity").value.includes(name))
// document.getElementById("mainCity").value += " "+(name);
//if(document.getElementById("mainCity").value.split(" ").indexOf(name)==1)
//n=document.getElementById("mainCity").value.replace(name,"");
//alert(n)
//const str2 = name;
//const result = [...new Set(str1.split(" ").filter(name => !str2.includes(name)))].join(" ");
//console.log(result);

//if(x.indexOf(name) == 1)
// document.getElementById("mainCity").value -= " "+(name);
