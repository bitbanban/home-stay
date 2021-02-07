'use strict';

const contentId = getParam('contentId');
let areaCode;
const pageNum = getParam('pageNum');
const month = getParam('month');
//API 실행
parseDetailInfo(contentId);
parseDetailImage(contentId);
parseCommonInfo(contentId);
parseDetailIntro(contentId);

/* functions  */

//parameter 가져오기
function getParam(key) {
  let param;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  param = urlParams.get(key);
  return param;
}

//***** APIs ******
function getAreaName(areaCode) {
  let xmlStr;
  let xmlDoc;
  var xhr = new XMLHttpRequest();
  var url =
    'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode'; /*URL*/
  var queryParams =
    '?' +
    encodeURIComponent('serviceKey') +
    '=' +
    'CaXsuilSjIPz3L19P%2F6ufv6lKG6DwvhRg5x2lK5lzUTP66WyVxrNQcvBdb6CxuXHRNrbDXoscBHGwPy5aQd4sw%3D%3D'; /*Service Key*/
  queryParams +=
    '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
  queryParams +=
    '&' +
    encodeURIComponent('MobileApp') +
    '=' +
    encodeURIComponent('test%20App'); /**/
  queryParams +=
    '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('20'); /**/
  queryParams +=
    '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('Y');
  queryParams +=
    '&' + encodeURIComponent('listYN') + '=' + encodeURIComponent('Y');
  console.log(url + queryParams);
  xhr.open('GET', url + queryParams);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      xmlStr = this.responseText;
      var xmlParser, xmlDoc;
      xmlParser = new DOMParser();
      xmlDoc = xmlParser.parseFromString(xmlStr, 'text/xml');

      let list = xmlDoc.getElementsByTagName('item');
      let areaName;
      for (let i = 0; i < list.length; i++) {
        if (
          list[i].getElementsByTagName('code')[0].childNodes[0].nodeValue ===
          areaCode
        )
          areaName = list[i].getElementsByTagName('name')[0].childNodes[0]
            .nodeValue;
      }
      document.querySelector('.area').innerHTML = areaName;
      document.querySelector('#goList').addEventListener('click', () => {
        location.href = `/festival/list?areaCode=${areaCode}&pageNum=${pageNum}&month=${month}`;
      });
    }
  };
  xhr.send(null);
}

//종합정보
function parseCommonInfo(contentId) {
  let xmlStr;
  let xmlDoc;
  var xhr = new XMLHttpRequest();
  var url =
    'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon'; /*URL*/
  var queryParams =
    '?' +
    encodeURIComponent('serviceKey') +
    '=' +
    'CaXsuilSjIPz3L19P%2F6ufv6lKG6DwvhRg5x2lK5lzUTP66WyVxrNQcvBdb6CxuXHRNrbDXoscBHGwPy5aQd4sw%3D%3D'; /*Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('contentTypeId') +
    '=' +
    encodeURIComponent('15'); /**/
  queryParams +=
    '&' +
    encodeURIComponent('contentId') +
    '=' +
    encodeURIComponent(contentId); /**/
  queryParams +=
    '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
  queryParams +=
    '&' +
    encodeURIComponent('MobileApp') +
    '=' +
    encodeURIComponent('test%20App'); /**/
  queryParams +=
    '&' + encodeURIComponent('defaultYN') + '=' + encodeURIComponent('Y'); /**/
  queryParams +=
    '&' + encodeURIComponent('firstImageYN') + '=' + encodeURIComponent('Y');
  queryParams +=
    '&' + encodeURIComponent('areacodeYN') + '=' + encodeURIComponent('Y');
  queryParams +=
    '&' + encodeURIComponent('catcodeYN') + '=' + encodeURIComponent('Y');
  queryParams +=
    '&' + encodeURIComponent('addrinfoYN') + '=' + encodeURIComponent('Y');
  queryParams +=
    '&' + encodeURIComponent('mapinfoYN') + '=' + encodeURIComponent('Y');
  queryParams +=
    '&' +
    encodeURIComponent('areacodoverviewYNeYN') +
    '=' +
    encodeURIComponent('Y');
  queryParams +=
    '&' + encodeURIComponent('transGuideYN') + '=' + encodeURIComponent('Y');

  xhr.open('GET', url + queryParams);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      xmlStr = this.responseText;
      var xmlParser, xmlDoc;
      xmlParser = new DOMParser();
      xmlDoc = xmlParser.parseFromString(xmlStr, 'text/xml');
      let list = xmlDoc.getElementsByTagName('item');
      areaCode = list[0].getElementsByTagName('areacode')[0].childNodes[0]
        .nodeValue;
      getAreaName(areaCode);
      let poster = `<img src='${
        list[0].getElementsByTagName('firstimage')[0].childNodes[0].nodeValue
      }'  >`;

      let title = list[0].getElementsByTagName('title')[0].childNodes[0]
        .nodeValue;
      let addr = list[0].getElementsByTagName('addr1')[0].childNodes[0]
        .nodeValue;
      document.querySelector('.addr').innerHTML = addr;
      document.querySelector('.fes-title').innerHTML = title;
      document.querySelector('.fes-poster').innerHTML = poster;

      let mapx = list[0].getElementsByTagName('mapx')[0].childNodes[0]
        .nodeValue;
      let mapy = list[0].getElementsByTagName('mapy')[0].childNodes[0]
        .nodeValue;

      var mapContainer = document.querySelector('.fes-map'), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(mapy, mapx), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      var imageSrc = '/img/location-pin.png', // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(60, 64), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        ),
        markerPosition = new kakao.maps.LatLng(mapy, mapx); // 마커가 표시될 위치입니다

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커이미지 설정
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    }
  };
  xhr.send(null);
}

//디테일소개
function parseDetailIntro(contentId) {
  let xmlStr;
  let xmlDoc;
  var xhr = new XMLHttpRequest();
  var url =
    'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro'; /*URL*/
  var queryParams =
    '?' +
    encodeURIComponent('serviceKey') +
    '=' +
    'CaXsuilSjIPz3L19P%2F6ufv6lKG6DwvhRg5x2lK5lzUTP66WyVxrNQcvBdb6CxuXHRNrbDXoscBHGwPy5aQd4sw%3D%3D'; /*Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('contentTypeId') +
    '=' +
    encodeURIComponent('15'); /**/
  queryParams +=
    '&' +
    encodeURIComponent('contentId') +
    '=' +
    encodeURIComponent(contentId); /**/
  queryParams +=
    '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
  queryParams +=
    '&' +
    encodeURIComponent('MobileApp') +
    '=' +
    encodeURIComponent('test%20App'); /**/
  queryParams +=
    '&' + encodeURIComponent('introYN') + '=' + encodeURIComponent('Y'); /**/

  xhr.open('GET', url + queryParams);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      xmlStr = this.responseText;
      var xmlParser, xmlDoc;
      xmlParser = new DOMParser();
      xmlDoc = xmlParser.parseFromString(xmlStr, 'text/xml');
      let list = xmlDoc.getElementsByTagName('item');

      let s = '';
      s += `<li><b>주최기관</b><span>${
        list[0].getElementsByTagName('sponsor1')[0].childNodes[0].nodeValue
      }</span></li>`;
      s += `<li><b>행사장소</b><span>${
        list[0].getElementsByTagName('eventplace')[0].childNodes[0].nodeValue
      }</span></li>`;
      s += `<li><b>행사시작일</b><span>${
        list[0].getElementsByTagName('eventstartdate')[0].childNodes[0]
          .nodeValue
      }</span></li>`;
      s += `<li><b>행사종료일</b><span>${
        list[0].getElementsByTagName('eventenddate')[0].childNodes[0].nodeValue
      }</span></li>`;
      s += `<li><b>이용료</b><span>${
        list[0].getElementsByTagName('usetimefestival')[0].childNodes[0]
          .nodeValue
      }</span></li>`;

      document.querySelector('.detail-info').innerHTML = s;
    }
  };
  xhr.send(null);
}

//디테일 정보
function parseDetailInfo(contentId) {
  let xmlStr;
  let xmlDoc;
  var xhr = new XMLHttpRequest();
  var url =
    'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailInfo'; /*URL*/
  var queryParams =
    '?' +
    encodeURIComponent('serviceKey') +
    '=' +
    'CaXsuilSjIPz3L19P%2F6ufv6lKG6DwvhRg5x2lK5lzUTP66WyVxrNQcvBdb6CxuXHRNrbDXoscBHGwPy5aQd4sw%3D%3D'; /*Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('contentTypeId') +
    '=' +
    encodeURIComponent('15'); /**/
  queryParams +=
    '&' +
    encodeURIComponent('contentId') +
    '=' +
    encodeURIComponent(contentId); /**/
  queryParams +=
    '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
  queryParams +=
    '&' +
    encodeURIComponent('MobileApp') +
    '=' +
    encodeURIComponent('test%20App'); /**/
  queryParams +=
    '&' + encodeURIComponent('listYN') + '=' + encodeURIComponent('Y'); /**/

  xhr.open('GET', url + queryParams);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      xmlStr = this.responseText;
      var xmlParser, xmlDoc;
      xmlParser = new DOMParser();
      xmlDoc = xmlParser.parseFromString(xmlStr, 'text/xml');

      let list = xmlDoc.getElementsByTagName('item');
      let fesDescription = document.querySelector('.fes-description');

      for (let i = 0; i < list.length; i++) {
        let infotext =
          "<p class='description'>" +
          list[i].getElementsByTagName('infotext')[0].childNodes[0].nodeValue +
          '</p>';

        fesDescription.innerHTML = infotext;
      }
    }
  };
  xhr.send(null);
}

//사진가져오기
function parseDetailImage(contentId) {
  let xmlStr;
  let xmlDoc;
  var xhr = new XMLHttpRequest();
  var url =
    'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailImage'; /*URL*/
  var queryParams =
    '?' +
    encodeURIComponent('serviceKey') +
    '=' +
    'CaXsuilSjIPz3L19P%2F6ufv6lKG6DwvhRg5x2lK5lzUTP66WyVxrNQcvBdb6CxuXHRNrbDXoscBHGwPy5aQd4sw%3D%3D'; /*Service Key*/
  queryParams +=
    '&' +
    encodeURIComponent('contentTypeId') +
    '=' +
    encodeURIComponent('15'); /**/
  queryParams +=
    '&' +
    encodeURIComponent('contentId') +
    '=' +
    encodeURIComponent(contentId); /**/
  queryParams +=
    '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
  queryParams +=
    '&' +
    encodeURIComponent('MobileApp') +
    '=' +
    encodeURIComponent('test%20App'); /**/
  queryParams +=
    '&' + encodeURIComponent('imageYN') + '=' + encodeURIComponent('Y');

  xhr.open('GET', url + queryParams);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      xmlStr = this.responseText;
      var xmlParser, xmlDoc;
      xmlParser = new DOMParser();
      xmlDoc = xmlParser.parseFromString(xmlStr, 'text/xml');

      let list = xmlDoc.getElementsByTagName('item');
      let img = "<div class='slider'>";

      for (let i = 0; i < list.length; i++) {
        img += `<a href='#slide-${i + 1}'>${i + 1}</a>`;
      }

      img += '<div class="slides">';

      for (let i = 0; i < list.length; i++) {
        img += `<img src='${
          list[i].getElementsByTagName('originimgurl')[0].childNodes[0]
            .nodeValue
        }' id="slide-${i + 1}" class="slide-img">`;
      }

      img += '</div></div>';
      document.querySelector('.fes-photo').innerHTML = img;
    }
  };
  xhr.send(null);
}
