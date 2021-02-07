'use strict';

const loginNum = document.querySelector('span#num').getAttribute('data-id');
const link = decodeURI(document.location.href);
const contentId = link.split('=');
const id = contentId[1];
let marked;
let liked;
let userNum;
const placeBox = document.querySelector('#placeBox');
const contentBox = document.querySelector('#contentBox');
const duringText = document.querySelector('#duringText');
const whoText = document.querySelector('#whoText');
const howText = document.querySelector('#howText');
const courseTitle = document.querySelector('#courseTitle');

function myPlaceList() {
  var xhr = new XMLHttpRequest();
  var url = '/api/courses/' + id;
  xhr.open('GET', url);
  xhr.send();
  console.log(url);

  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      let data = JSON.parse(this.responseText);
      let item = data.coursePlaceList;
      let dtoItem = data.courseDto;
      let courseTitleText = dtoItem.name;
      courseTitle.innerHTML = courseTitleText;
      userNum = dtoItem.userNum;
      document.querySelector('span#num').setAttribute('CN', userNum);
      let who;
      let during;
      let how;

      switch (dtoItem.who) {
        case 'W1':
          who = '혼자';
          break;
        case 'W2':
          who = '가족';
          break;
        case 'W3':
          who = '연인';
          break;
        case 'W4':
          who = '우정';
          break;
      }
      switch (dtoItem.during) {
        case 'D1':
          during = '당일치기';
          break;
        case 'D2':
          during = '1박2일';
          break;
        case 'D3':
          during = '2박3일 이상';
          break;
      }
      switch (dtoItem.how) {
        case 'H1':
          how = '뚜벅이';
          break;
        case 'H2':
          how = '자전거';
          break;
        case 'H3':
          how = '자동차';
          break;
        case 'H4':
          how = '기차';
          break;
      }
      whoText.innerHTML = `#${who}`;
      duringText.innerHTML = `#${during}`;
      howText.innerHTML = `#${how}`;

      let content = dtoItem.content;
      contentBox.innerHTML = content;

      let s = ' ';
      for (let i = 0; i < item.length; i++) {
        let title = item[i].title;
        let addr = item[i].addr1;
        let firstImage = item[i].firstImage;
        let placeId = item[i].contentId;

        s += `<div id="placeBox">`;
        s += `<div class="course-box">`;
        s += `<div class="image-box">`;
        s += `<img src='${firstImage}' alt='${title}' onerror="this.src='/img/noimage.png'">`;
        s += '</div>';
        s += `<div class="course-info__box">`;
        s += `<div class="course-info">`;
        s += `<p class='course-name' onclick='location.href="/tourplace/detail?contentId=${placeId}"'>${title}</p>`;
        s += "<p class='course-start'>" + addr + '</p>';
        s += '</div>';
        s += '</div>';
        s += '</div>';
        s += `<hr class="hr2">`;
      }
      getMarkLikeNum(id);
      placeBox.innerHTML = s;
    }
  };
}

myPlaceList();

////////////////map

var mapxhr = new XMLHttpRequest();
var mapurl = '/api/courses/' + id;
mapxhr.open('GET', mapurl);
mapxhr.send();

mapxhr.onreadystatechange = function () {
  if (this.readyState == 4) {
    var mapContainer = document.getElementById('mapBox'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(35.56568016231779, 127.93715554020916), // 지도의 중심좌표
        level: 13, // 지도의 확대 레벨
      };

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption);
    let mapdata = JSON.parse(this.responseText);
    let mapitem = mapdata.coursePlaceList;
    let linePath = new Array();
    for (let m = 0; m < mapitem.length; m++) {
      let mapX = mapitem[m].mapX;
      let mapY = mapitem[m].mapY;
      //console.log(mapX+","+mapY);

      //linePath 배열안에 좌표넣기
      linePath.push(new kakao.maps.LatLng(mapY, mapX));

      //마커의 위치
      var markerPosition = new kakao.maps.LatLng(mapY, mapX);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    }

    console.log(linePath);
    // 지도에 표시할 선을 생성합니다
    var polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: 'red', // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid', // 선의 스타일입니다
    });

    // 지도에 선을 표시합니다
    polyline.setMap(map);

    var distance = polyline.getLength();
    var distanceKm = (distance / 1000).toFixed(1);
    // console.log(distanceKm+"km");

    let distanceCourse = document.querySelector('.course-km');
    distanceCourse.innerText = `코스 총거리 : ${distanceKm}km`;
  }
};
/////////////////////
// var linePath = [
//     new kakao.maps.LatLng(37.555188101592755, 126.97640613899671),
//     new kakao.maps.LatLng(35.27942129788492, 129.02025765801514),
//     new kakao.maps.LatLng(35.0649564575427, 126.82415007526825)

// ];

// Get the modal

var modal = document.getElementById('myModal');

// Get the button that opens the modal
const shareIcon = document.querySelector('#shareIcon');

// When the user clicks on the button, open the modal
shareIcon.onclick = function () {
  modal.style.display = 'block';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

function getURL() {
  let uri = location.href;

  document.getElementById('urlText').innerHTML = '<p>' + uri + '</p>';
}

//좋아요 추가
function likeCourse(like) {
  const likeBtn = document.querySelector('#likeIcon');
  //const like = document.querySelector('#likeIcon').getAttribute('data-id');
  const xhr = new XMLHttpRequest();
  const userNum = document.querySelector('span#num').getAttribute('CN');
  const courseNum = decodeURI(document.location.href).split('=')[1];
  const loginNum = document.querySelector('span#num').getAttribute('data-id');
  const url = '/api/courselikes';
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-type', 'application/json');
  const data = {
    likeNum: like,
    userNum: userNum,
    courseNum: courseNum,
    loginNum: loginNum,
  };

  console.log(data);
  xhr.send(JSON.stringify(data));

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      likeBtn.classList.add('liked');

      console.log('liked');
      getMarkLikeNum(courseNum);
    } else {
    }
  };
}

//좋아요 삭제
function unlikeCourse(like) {
  const likeBtn = document.querySelector('#likeIcon');
  //const like = document.querySelector('#likeIcon').getAttribute('data-id');
  const xhr = new XMLHttpRequest();

  const url = `/api/courselikes/${like}/${id}`;
  xhr.open('DELETE', url);
  xhr.send();

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    likeBtn.classList.remove('liked');
    likeBtn.setAttribute('data-id', 0);
    if (xhr.status === 200) {
      likeBtn.classList.remove('liked');
      likeBtn.setAttribute('data-id', 0);
      console.log('unliked');
    }
  };
}

//즐겨찾기 추가
function addFavorite(mark) {
  // const mark = document.querySelector('#favoriteIcon').getAttribute('data-id');

  const favoriteBtn = document.querySelector('#favoriteIcon');
  const userNum = document.querySelector('span#num').getAttribute('CN');
  const courseNum = decodeURI(document.location.href).split('=')[1];
  const loginNum = document.querySelector('span#num').getAttribute('data-id');
  const xhr = new XMLHttpRequest();
  const url = `/api/coursemarks`;
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-type', 'application/json');

  const data = {
    courseMarkNum: mark,
    userNum: userNum,
    courseNum: courseNum,
    loginNum: loginNum,
  };

  console.log(data);
  xhr.send(JSON.stringify(data));

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      favoriteBtn.classList.add('favorite');
      console.log('favorite');
      getMarkLikeNum(courseNum);
    } else {
    }
  };
}

//즐겨찾기 삭제
function deleteFavorite(mark) {
  const favoriteBtn = document.querySelector('#favoriteIcon');
  const xhr = new XMLHttpRequest();
  const url = `/api/coursemarks/${mark}`;
  xhr.open('DELETE', url);
  xhr.send();
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      favoriteBtn.classList.remove('favorite');
      favoriteBtn.setAttribute('data-id', 0);
      console.log('delete-favorite');
    } else {
    }
  };
}

//로그인 유저가의해당 게시물 좋아요, 즐겨찾기 정보 => 좋아요,즐겨찾기 시  해당 유저의 {userNum} ,
//로그아웃 , 즐겨찾기 좋아요 하지 않을 경우 {0}
function getMarkLikeNum(id) {
  var xhr = new XMLHttpRequest();
  var url = '/api/courses/ischeck/' + id;
  xhr.open('GET', url);
  xhr.send();
  console.log(url);

  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      let data = JSON.parse(this.responseText);
      marked = data.markNum;
      liked = data.likeNum;

      console.log(data);
      const likeBtn = document.querySelector('#likeIcon');
      const markBtn = document.querySelector('#favoriteIcon');
      likeBtn.setAttribute('data-id', liked);
      markBtn.setAttribute('data-id', marked);
      if (marked != 0) {
        markBtn.classList.add('favorite');
      }
      if (liked != 0) {
        likeBtn.classList.add('liked');
      }
    }
  };
}

function clickLike() {
  const like = document.querySelector('#likeIcon').getAttribute('data-id');
  console.log(loginNum);
  if (loginNum == 'out') {
    alert('로그인후 이용해주세요');
  } else {
    if (like == 0) {
      likeCourse(like);
    } else {
      unlikeCourse(like);
    }
  }
}

function clickFavorite() {
  const mark = document.querySelector('#favoriteIcon').getAttribute('data-id');
  console.log(loginNum);
  if (loginNum == 'out') {
    alert('로그인후 이용해주세요');
  } else {
    if (mark == 0) {
      addFavorite(mark);
    } else {
      deleteFavorite(mark);
    }
  }
}
