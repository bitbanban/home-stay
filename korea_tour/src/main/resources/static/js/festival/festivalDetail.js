'use strict';

const contentId = getParam('contentId');
let areaCode;
const pageNum = getParam('pageNum');
const month = getParam('month');
//API 실행
loadDetailInfo(contentId);
loadDetailImage(contentId);
loadCommonInfo(contentId);
loadDetailIntro(contentId);

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
async function getAreaName(areaCode) {
  let url =
    'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode'; /*URL*/
  let queryParams =
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

  const response = await fetch(url + queryParams).then(response =>
    response.text()
  );

  const data = new window.DOMParser().parseFromString(response, 'text/xml');
  let list = await data.getElementsByTagName('item');
  let areaName;
  list = [...list];
  list.map(item => {
    if (
      item.getElementsByTagName('code')[0].childNodes[0].nodeValue === areaCode
    )
      areaName = item.getElementsByTagName('name')[0].childNodes[0].nodeValue;
  });

  document.querySelector('.area').innerHTML = areaName;
  document.querySelector('#goList').addEventListener('click', () => {
    location.href = `/festival/list?areaCode=${areaCode}&pageNum=${pageNum}&month=${month}`;
  });
}

//종합정보
async function loadCommonInfo(contentId) {
  let url =
    'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon'; /*URL*/
  let queryParams =
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

  const response = await fetch(url + queryParams).then(response =>
    response.text()
  );

  const data = new window.DOMParser().parseFromString(response, 'text/xml');

  let list = await data.getElementsByTagName('item');

  areaCode = list[0].getElementsByTagName('areacode')[0].childNodes[0]
    .nodeValue;
  getAreaName(areaCode);
  let poster;
  if (list[0].getElementsByTagName('firstimage')[0] != undefined) {
    poster = `<img src='${
      list[0].getElementsByTagName('firstimage')[0].childNodes[0].nodeValue
    }'  >`;
  } else {
    poster = `<img src='/img/noimage.png' class='thumbnail' />`;
  }

  let title = list[0].getElementsByTagName('title')[0].childNodes[0].nodeValue;
  let addr = list[0].getElementsByTagName('addr1')[0].childNodes[0].nodeValue;
  document.querySelector('.addr').innerHTML = addr;
  document.querySelector('.title').innerHTML = title;
  document.querySelector('.poster').innerHTML = poster;

  let mapx = list[0].getElementsByTagName('mapx')[0].childNodes[0].nodeValue;
  let mapy = list[0].getElementsByTagName('mapy')[0].childNodes[0].nodeValue;

  let mapContainer = document.querySelector('.map'), // 지도를 표시할 div
    mapOption = {
      center: new kakao.maps.LatLng(mapy, mapx), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

  let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  let imageSrc = '/img/location-pin.png', // 마커이미지의 주소입니다
    imageSize = new kakao.maps.Size(60, 64), // 마커이미지의 크기입니다
    imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  let markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    ),
    markerPosition = new kakao.maps.LatLng(mapy, mapx); // 마커가 표시될 위치입니다

  // 마커를 생성합니다
  let marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage, // 마커이미지 설정
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
}

//디테일소개
async function loadDetailIntro(contentId) {
  let url =
    'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro'; /*URL*/
  let queryParams =
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

  const response = await fetch(url + queryParams).then(response =>
    response.text()
  );

  const data = new window.DOMParser().parseFromString(response, 'text/xml');

  let list = await data.getElementsByTagName('item');

  let s = '';
  s += `<li><b>주최기관</b><span>${
    list[0].getElementsByTagName('sponsor1')[0].childNodes[0].nodeValue
  }</span></li>`;
  s += `<li><b>행사장소</b><span>${
    list[0].getElementsByTagName('eventplace')[0].childNodes[0].nodeValue
  }</span></li>`;
  s += `<li><b>행사시작일</b><span>${
    list[0].getElementsByTagName('eventstartdate')[0].childNodes[0].nodeValue
  }</span></li>`;
  s += `<li><b>행사종료일</b><span>${
    list[0].getElementsByTagName('eventenddate')[0].childNodes[0].nodeValue
  }</span></li>`;
  s += `<li><b>이용료</b><span>${list[0]
    .getElementsByTagName('usetimefestival')[0]
    .childNodes[0].nodeValue.replace('<br>', '  ')}</span></li>`;

  document.querySelector('.detail-info').innerHTML = s;
}

//디테일 정보
async function loadDetailInfo(contentId) {
  let url =
    'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailInfo'; /*URL*/
  let queryParams =
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

  let fesDescription = document.querySelector('.description');
  const response = await fetch(url + queryParams).then(response =>
    response.text()
  );

  const data = new window.DOMParser().parseFromString(response, 'text/xml');

  let list = await data.getElementsByTagName('item');
  for (let i = 0; i < list.length; i++) {
    let infotext =
      '<p>' +
      list[i].getElementsByTagName('infotext')[0].childNodes[0].nodeValue +
      '</p>';

    fesDescription.innerHTML = infotext;
  }
}

//사진가져오기
async function loadDetailImage(contentId) {
  let url =
    'http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailImage'; /*URL*/
  let queryParams =
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

  let img = '';
  const response = await fetch(url + queryParams).then(response =>
    response.text()
  );

  const data = new window.DOMParser().parseFromString(response, 'text/xml');

  let list = await data.getElementsByTagName('item');
  for (let i = 0; i < list.length; i++) {
    img += `<img src='${
      list[i].getElementsByTagName('originimgurl')[0].childNodes[0].nodeValue
    }'  class="slide-img">`;
  }

  document.querySelector('.photo').innerHTML = img;
}

document.querySelector('#fesPhoto').addEventListener('click', () => {
  document.querySelector('#fesPhotos').classList.toggle('hidden');
});
