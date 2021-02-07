'use strict';

const link = decodeURI(document.location.href);
const contentId = link.split('=');
const id = contentId[1];
let deleteCourseList = [];
const placeBox = document.querySelector('#placeBox');
const totalCountBox = document.querySelector('#totalCount');

function myCourseList() {
  var xhr = new XMLHttpRequest();
  var url = '/api/tourmypage/coursedetail/' + id;
  xhr.open('GET', url);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      let data = JSON.parse(this.responseText);
      let item = data.coursePlaceList;
      let courseinfo = data.courseDto;
      //console.log(courseinfo);
      let totalCount = item.length;
      totalCountBox.innerHTML = '총' + totalCount + '건';

      let s = ' ';
      for (let i = 0; i < item.length; i++) {
        let title = item[i].title;
        let addr = item[i].addr1;
        let firstImage = item[i].firstImage;
        let placeId = item[i].contentId;
        let coursePlaceNum = item[i].coursePlaceNum;
        let orderNum = item[i].orderNum;

        s += `<div class="course-box" seq=${coursePlaceNum} orderNum=${orderNum}>`;
        s += `<div class="image-box">`;
        s += `<img src=${firstImage} alt=${title} onerror="this.src='/img/noimage.png'">`;
        s += `</div>`;
        s += `<div class="course-info__box">`;
        s += `<div class="course-info">`;
        s += `<p class="course-name" onclick='location.href="/tourplace/detail?contentId=${placeId}"'>${title}</p>`;
        s += `<p class="course-start">${addr}</p>`;
        s += `</div>`;
        s += `<i class="fas fa-ellipsis-v course-icon click-modal" num=${coursePlaceNum} onclick="createModal()"></i>`;
        s += `</div>`;
        s += `</div>`;

        placeBox.innerHTML = s;
      }

      document.querySelector('#contentBox').value = courseinfo.content;
      document.querySelector('#courseName').value = courseinfo.name;
      document
        .querySelector('#courseName')
        .setAttribute('num', courseinfo.courseNum);
      const durings = document.querySelector('#selectDuring');
      const whos = document.querySelector('#selectWho');
      const hows = document.querySelector('#selectHow');
      const opens = document.querySelectorAll('input[name=checkbox]');
      //console.log(durings[0]);

      for (const during of durings) {
        if (during.value == courseinfo.during) {
          during.setAttribute('selected', true);
        }
      }
      for (const who of whos) {
        if (who.value == courseinfo.who) {
          who.setAttribute('selected', true);
        }
      }
      for (const how of hows) {
        if (how.value == courseinfo.how) {
          how.setAttribute('selected', true);
        }
      }
      for (const open of opens) {
        if (open.value == courseinfo.open) {
          open.setAttribute('checked', true);
        }
      }
    }
  };
}

var mapxhr = new XMLHttpRequest();
var mapurl = '/api/tourmypage/coursedetail/' + id;
mapxhr.open('GET', mapurl);
mapxhr.send();

mapxhr.onreadystatechange = function () {
  if (this.readyState == 4) {
    var mapContainer = document.getElementById('mapBox'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(35.56568016231779, 127.93715554020916), // 지도의 중심좌표
        level: 12, // 지도의 확대 레벨
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

    let distanceCourse = document.querySelector('.count-box__distance-text');
    distanceCourse.innerText = `코스 총거리 : ${distanceKm}km`;
  }
};

myCourseList();

function moveUp(i) {
  let coursePlaceNum = i.getAttribute('num');
  var movingDiv = document.querySelector(
    ".course-box[seq='" + coursePlaceNum + "']"
  );

  var prevDiv = movingDiv.previousSibling;

  if (prevDiv == null) {
    alert('첫번째 입니다');
  } else {
    let tempDiv = movingDiv;

    movingDiv.remove();
    placeBox.insertBefore(tempDiv, prevDiv);
  }

  //	moveCourseSave();
}

function moveDown(i) {
  let coursePlaceNum = i.getAttribute('num');
  var movingDiv = document.querySelector(
    ".course-box[seq='" + coursePlaceNum + "']"
  );

  var nextDiv = movingDiv.nextSibling;

  if (nextDiv == null) {
    alert('마지막 입니다');
  } else {
    let tempDiv = movingDiv;

    movingDiv.remove();
    placeBox.insertBefore(tempDiv, nextDiv.nextSibling);
  }

  //	moveCourseSave();
}

function createModal() {
  var modal = document.getElementById('myModal');
  const clickModals = document.querySelectorAll('.click-modal');
  for (const clickModal of clickModals) {
    clickModal.onclick = function (e) {
      let num = this.getAttribute('num');
      document.querySelector('#downBtn').setAttribute('num', num);
      document.querySelector('#upBtn').setAttribute('num', num);
      document.querySelector('#deleteBtn').setAttribute('num', num);
      modal.style.display = 'block';
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  }
}

function getURL() {
  let uri = location.href;

  document.getElementById('urlText').innerHTML = '<p>' + uri + '</p>';
}

//댓글 글자 수
function counter() {
  let content = document.getElementById('contentBox').value;
  if (content.length > 200) {
    content = content.substring(0, 200);
    document.getElementById('contentBox').value = content;
  }
  document.getElementById('count').innerHTML = '(' + content.length + '/200)';
}
counter();

function back() {
  history.back();
}
// 저장하기
function placeListSave() {
  const courseList = document.querySelectorAll('.course-box');
  let data = [];
  for (const [i, course] of courseList.entries()) {
    const coursePlaceNum = course.getAttribute('seq');
    const orderNum = course.getAttribute('orderNum');
    if (orderNum != i + 1) {
      data.push({ coursePlaceNum: parseInt(coursePlaceNum), orderNum: i + 1 });
    }
  }

  data = '{"list":' + JSON.stringify(data) + '}';

  return data;
}

function deletePlaceList(i) {
  let coursePlaceNum = i.getAttribute('num');

  var movingDiv = document.querySelector(
    ".course-box[seq='" + coursePlaceNum + "']"
  );

  movingDiv.remove();
  deleteCourseList.push(coursePlaceNum);
}

function saveMyCourse() {
  const placelist = placeListSave();
  let deletePlaces = deleteCourseList;
  let coursedata = saveCourseData();
  const deleteData = deletePlaces =>
    new Promise((resolve, reject) => {
      for (const courseNum of deletePlaces) {
        deletePlace(courseNum);
      }
      resolve(placeListSave());
    });
  const saveCourseOrder = placelist =>
    new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      var url = '/api/courseplaces';
      xhr.open('PATCH', url);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.send(placelist);

      resolve(saveCourseData());
    });

  deleteData(deletePlaces)
    .then(saveCourseOrder(placelist))
    .then(saveCourse(coursedata));
}

function deletePlace(courseNum) {
  var xhr = new XMLHttpRequest();
  var url = '/api/courseplaces/' + courseNum;
  xhr.open('DELETE', url);
  xhr.send(null);
}

function saveCourseData() {
  const content = document.querySelector('#contentBox').value;
  const name = document.querySelector('#courseName').value;
  let during = document.querySelector('#selectDuring');
  during = during.options[during.selectedIndex].value;
  let who = document.querySelector('#selectWho');
  who = who.options[who.selectedIndex].value;
  let how = document.querySelector('#selectHow');
  how = how.options[how.selectedIndex].value;
  const opens = document.querySelectorAll('input[name=checkbox]');
  const courseNum = document.querySelector('#courseName').getAttribute('num');
  let open;
  for (const o of opens) {
    if (o.checked == true) {
      open = o.value;
    }
  }

  const data = {
    content: content,
    name: name,
    during: during,
    who: who,
    how: how,
    open: parseInt(open),
    courseNum: parseInt(courseNum),
  };

  return data;
}

function saveCourse(coursedata) {
  //console.log(coursedata);

  const url = '/api/courses';
  const xhr = new XMLHttpRequest();
  xhr.open('PATCH', url);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(JSON.stringify(coursedata));

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      window.location.href = '/tourmypage/courselist';
    } else {
      console.log('Error!');
    }
  };
}
