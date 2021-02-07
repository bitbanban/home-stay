'use strict';

let sort;
let who;
let how;
let during;
const perBlock = 5;
let currentPage;
let startPage;
let endPage;

getCourse(sort, who, during, how, currentPage);
sortOnclick();
whoOnclick();
setCategories();
// parameter value 읽기
function getParam(key) {
  let param;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  param = urlParams.get(key);
  return param;
}

function sortOnclick() {
  let sorts = document.querySelectorAll('.sort-list');
  for (const sort of sorts) {
    sort.addEventListener('click', function (e) {
      let sortCode = e.target.getAttribute('sort');

      const children = sort.parentElement.children;
      for (const child of children) {
        child.classList.remove('active');
      }

      sort.classList.toggle('active');

      getCourse(sortCode, who, during, how, currentPage);
    });
  }
}
function whoOnclick() {
  let tags = document.querySelectorAll('.tag');
  for (const tag of tags) {
    tag.addEventListener('click', function (e) {
      const children = tag.parentElement.children;
      for (const child of children) {
        child.classList.remove('active');
      }
      if (e.target.getAttribute('who') != null) {
        if (who == e.target.getAttribute('who')) {
          who = '';
          tag.classList.remove('active');
        } else {
          who = e.target.getAttribute('who');
          tag.classList.add('active');
        }
      }
      if (e.target.getAttribute('how') != null) {
        if (how == e.target.getAttribute('how')) {
          how = '';
          tag.classList.remove('active');
        } else {
          how = e.target.getAttribute('how');
          tag.classList.add('active');
        }
      }
      if (e.target.getAttribute('during') != null) {
        if (during == e.target.getAttribute('during')) {
          during = '';
          tag.classList.remove('active');
        } else {
          during = e.target.getAttribute('during');
          tag.classList.add('active');
        }
      }

      getCourse(sort, who, during, how, currentPage);
    });
  }
}

//api 데이터
function getCourse(sort, who, during, how, currentPage) {
  if (currentPage == undefined) currentPage = 1;
  if (who == undefined) who = getParam('who');
  if (how == undefined) how = getParam('how');
  if (during == undefined) during = getParam('during');
  if (sort == undefined) sort = 'time';
  let url;
  var xhr = new XMLHttpRequest();
  const whoURL = decodeURIComponent(who);
  const duringURL = decodeURIComponent(during);
  const howURL = decodeURIComponent(how);

  url = `/api/courses/custom/${sort}/${currentPage}?who=${whoURL}&during=${duringURL}&how=${howURL}`;

  /**/
  console.log(url);
  xhr.open('GET', url);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      const data = JSON.parse(this.responseText);
      const item = data.list;
      // console.log(data);
      let n = '';

      for (let i = 0; i < item.length; i++) {
        const courseNum = item[i].courseNum;
        n += `<a href='/tourcourse/detail?courseNum=${courseNum}'
        >`;

        n += `<div class="favorite-infobox">`;
        n += `<div class="image-box">`;
        if (item[i].firstImage) {
          n += `<img src='${item[i].firstImage}' class='thumbnail' />`;
        } else {
          n += `<img src="/img/noimage.png" onerror="this.src='/img/noimage.png'" class='thumbnail'>`;
        }
        n += `</div><div class="favorite-info__box">`;
        n += `<div class="favorite-info">`;
        n += `<p class="favorite-name">${item[i].name}</p>`;
        n += `<p class="favorite-start">${item[i].addr1}</p>`;
        n += `<span class='lieks'><i class="fas fa-heart"></i> ${item[i].totalLike}</span></div>`;
        n += `<i class="fas fa-ellipsis-v favorite-icon"></i></div></div></a>`;
      }
      document.querySelector('.course-list').innerHTML = n;

      //페이징 처리
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
      document.querySelector('.pagination').innerHTML = p;

      let pageList = document.querySelectorAll('.page-list');
      for (const page of pageList) {
        page.addEventListener('click', function (e) {
          let pageNum = e.target.getAttribute('page');

          if (totalPage < pageNum) pageNum = totalPage;
          getCourse(sort, who, during, how, pageNum);
        });
      }
    }
  };
  xhr.send(null);
}

function setCategories() {
  const paramwho = getParam('who');
  const paramduring = getParam('during');
  const paramhow = getParam('how');

  if (paramwho != '') {
    console.log(paramwho);
  }
  const tags = document.querySelectorAll('.tag');
  for (const tag of tags) {
    if (paramwho == tag.getAttribute('who')) {
      tag.classList.add('active');
      who = getParam('who');
    }

    if (paramduring == tag.getAttribute('during')) {
      tag.classList.add('active');
      during = getParam('during');
    }
    if (paramhow == tag.getAttribute('how')) {
      tag.classList.add('active');
      how = getParam('how');
    }
  }
}
