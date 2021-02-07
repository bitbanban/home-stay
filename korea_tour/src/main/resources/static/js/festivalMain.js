'use strict';
const date = new Date();
const currentYear = date.getFullYear();
const currMonth = date.getMonth() + 1;
const currDate = date.getDate();
let day = currDate;
let month = currMonth;

writeCalendar(currentYear, currMonth);
parseAreaBased(month, day);
document.querySelector('.pre-month').addEventListener('click', () => {
  if (month == 1) {
    month = 1;
  } else {
    month = month - 1;
  }

  writeCalendar(currentYear, month);
});
document.querySelector('.next-month').addEventListener('click', function () {
  if (month == 12) {
    month = 12;
  } else {
    month = month + 1;
  }

  writeCalendar(currentYear, month);
});
/* ----- functions ---- */
//eventEndDate 구하기
function getEndDate(year, month) {
  let endDate;
  switch (month) {
    case 4:
    case 6:
    case 9:
    case 11:
      endDate = 30;
      break;
    case 2:
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        endDate = 29;
      } else {
        endDate = 28;
      }
      break;
    default:
      endDate = 31;
      break;
  }

  return endDate;
}

function getEventDate(month, day) {
  if (day == undefined) day = '1';
  month = parseInt(month);

  let eventDate =
    currentYear +
    '' +
    (month > 9 ? month : '0' + month) +
    '' +
    (day > 9 ? day : '0' + day);
  return eventDate;
}

function writeCalendar(year, month) {
  let endDate = getEndDate(year, month);

  //월의 날자수 구하기

  let p = '';
  for (let i = 0; i < endDate; i++) {
    p += `<span class='cal-date'>${i + 1}</span>`;
  }

  document.querySelector('.cal-dates').innerHTML = p;
  const caldates = document.querySelectorAll('.cal-date');
  for (const date of caldates) {
    date.addEventListener('click', () => {
      day = date.innerHTML;

      const children = date.parentElement.children;
      for (const child of children) {
        child.classList.remove('active');
      }

      date.classList.add('active');

      parseAreaBased(month, day);
    });
  }
  let monthTitle = month;
  switch (month) {
    case 12:
    case 1:
    case 2:
      monthTitle = '⛄️' + monthTitle;
      break;
    case 3:
    case 4:
    case 5:
      monthTitle = '🌸' + monthTitle;
      break;
    case 6:
    case 7:
    case 8:
      monthTitle = '🏖' + monthTitle;
      break;
    default:
      monthTitle = '🍁' + monthTitle;
      break;
  }
  document.querySelector('.current-month').innerHTML = monthTitle + '월';
}

//api 데이터
function parseAreaBased(month, day) {
  let eventDate;
  if (month == 'all' || month == undefined) {
    month = date.getMonth() + 1;
    eventDate = getEventDate(month, day);
  } else {
    eventDate = getEventDate(month, day);
  }
  // console.log(eventDate);
  let xmlStr;
  let xmlDoc;
  var xhr = new XMLHttpRequest();
  var url =
    'http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchFestival'; /*URL*/
  var queryParams =
    '?' +
    encodeURIComponent('serviceKey') +
    '=' +
    'CaXsuilSjIPz3L19P%2F6ufv6lKG6DwvhRg5x2lK5lzUTP66WyVxrNQcvBdb6CxuXHRNrbDXoscBHGwPy5aQd4sw%3D%3D'; /*Service Key*/
  queryParams +=
    '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
  queryParams +=
    '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
  queryParams +=
    '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('ETC'); /**/
  queryParams +=
    '&' +
    encodeURIComponent('MobileApp') +
    '=' +
    encodeURIComponent('test%20App'); /**/
  queryParams +=
    '&' +
    encodeURIComponent('contentTypeId') +
    '=' +
    encodeURIComponent('15'); /**/
  queryParams +=
    '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('R'); /**/
  queryParams +=
    '&' + encodeURIComponent('listYN') + '=' + encodeURIComponent('Y');

  queryParams +=
    '&' +
    encodeURIComponent('eventStartDate') +
    '=' +
    encodeURIComponent(eventDate);
  queryParams +=
    '&' +
    encodeURIComponent('eventEndDate') +
    '=' +
    encodeURIComponent(eventDate);

  /*url 확인*/
  // console.log(url + queryParams);
  xhr.open('GET', url + queryParams);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      xmlStr = this.responseText;
      var xmlParser, xmlDoc;
      xmlParser = new DOMParser();
      xmlDoc = xmlParser.parseFromString(xmlStr, 'text/xml');

      let list = xmlDoc.getElementsByTagName('item');

      let s = '';
      if (list.length > 6) {
        let url = `/festival/detail?contentId=${
          list[6].getElementsByTagName('contentid')[0].childNodes[0].nodeValue
        }&areaCode=${
          list[6].getElementsByTagName('areacode')[0].childNodes[0].nodeValue
        }&pageNum=1&month=undefined`;
        let src = list[6].getElementsByTagName('firstimage')[0].childNodes[0]
          .nodeValue;
        s += `<a href='${url}'>`;
        s += `<div class='fes-main-card' style='background:url(${src}) no-repeat center bottom;  background-size: cover;'>`;
        s += "<div class='overlay'>";
        s += `<span class ='fes-date'>${
          list[6].getElementsByTagName('eventstartdate')[0].childNodes[0]
            .nodeValue
        } ~${
          list[6].getElementsByTagName('eventenddate')[0].childNodes[0]
            .nodeValue
        }</span>`;
        s += `<span class='fes-title'>${
          list[6].getElementsByTagName('title')[0].childNodes[0].nodeValue
        }</span></div></div></a>`;
      } else {
        let url = `/festival/detail?contentId=${
          list[0].getElementsByTagName('contentid')[0].childNodes[0].nodeValue
        }&areaCode=${
          list[0].getElementsByTagName('areacode')[0].childNodes[0].nodeValue
        }&pageNum=1&month=undefined`;
        let src = list[0].getElementsByTagName('firstimage')[0].childNodes[0]
          .nodeValue;
        s += `<a href='${url}'>`;
        s += `<div class='fes-main-card' style='background:url(${src}) no-repeat center bottom;  background-size: cover;'>`;
        s += "<div class='overlay'>";
        s += `<span class ='fes-date'>${
          list[0].getElementsByTagName('eventstartdate')[0].childNodes[0]
            .nodeValue
        } ~${
          list[0].getElementsByTagName('eventenddate')[0].childNodes[0]
            .nodeValue
        }</span>`;
        s += `<span class='fes-title'>${
          list[0].getElementsByTagName('title')[0].childNodes[0].nodeValue
        }</span></div></div></a>`;
      }
      document.querySelector('.festival-main').innerHTML = s;
      let l = '';

      for (let i = 1; i < 4; i++) {
        let url = `/festival/detail?contentId=${
          list[i].getElementsByTagName('contentid')[0].childNodes[0].nodeValue
        }&areaCode=${
          list[i].getElementsByTagName('areacode')[0].childNodes[0].nodeValue
        }&pageNum=1&month=undefined`;

        l += `<a href='${url}'>`;
        let src = list[i].getElementsByTagName('firstimage')[0].childNodes[0]
          .nodeValue;
        l += `<div class='fes-card' style='background:url(${src}) no-repeat center bottom;  background-size: cover;'>`;
        l += "<div class='overlay'>";

        l += `<span class ='fes-date'>${
          list[i].getElementsByTagName('eventstartdate')[0].childNodes[0]
            .nodeValue
        } ~${
          list[i].getElementsByTagName('eventenddate')[0].childNodes[0]
            .nodeValue
        }</span>`;
        l += `<span class='fes-title'>${
          list[i].getElementsByTagName('title')[0].childNodes[0].nodeValue
        }</span></div></div></a>`;
      }

      document.querySelector('.festival-list').innerHTML = l;
    }
  };

  xhr.send(null);
}
