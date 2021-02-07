'use strict';

//코스담기 함수
function showInput() {

        document.querySelector('#createCourse').classList.remove('hidden');
        document.querySelector('.create-btn').classList.add('hidden');
       
}
function createCousre() {
  const xhr = new XMLHttpRequest();
  const input = document.querySelector('input#courseName');
  const name = input.value;
  const url = `/api/courses?name="${name}"`;
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-type', 'application/json');

  const userNum = document.querySelector('span#num').getAttribute('data-id');

  const data = {
    name: name,
  };

  console.log(url);
  xhr.send(null);

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      document.querySelector('input#courseName').value = '';
      document.querySelector('#createCourse').classList.add('hidden');
      document.querySelector('.create-btn').classList.remove('hidden');
      showCourses();
    }
  };
}
function addCourse(courseNum) {
  const xhr = new XMLHttpRequest();
  const url = '/api/courseplaces';
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-type', 'application/json');

  const userNum = document.querySelector('span#num').getAttribute('data-id');
  const contentId = decodeURI(document.location.href).split('=')[1];
  const data = { userNum: userNum, courseNum: courseNum, contentId: contentId };

  console.log(data);
  xhr.send(JSON.stringify(data));

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      location.href = `/tourmypage/courselist/detail?courseNum=${courseNum}`;
    }
  };
}

function showCourses() {
  let UsNum =document.getElementById("uNum");
  if (UsNum != null) {
  document.querySelector('#addModal').classList.remove('hidden');
  }
  const userNum = document.querySelector('span#num').getAttribute('data-id');
  if (userNum == 'out') return alert('로그인후 이용가능합니다');
  const xhr = new XMLHttpRequest();
  const url = `/api/place/detail/course/${userNum}`;
  xhr.open('GET', url);
  xhr.send();
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      let data = JSON.parse(this.responseText);
      const courses = data.course;
      console.log(data);

      let p = '<div class="course-list">';
      console.log(courses.length);
      for (let i = 0; i < courses.length; i++) {
        p += `<span class="course" data-num="${courses[i].courseNum}">${courses[i].name}</span>`;
      }
      p += '</div>';

      document.querySelector('#courseList').innerHTML = p;

      const courseList = document.querySelectorAll('.course');
      for (const course of courseList) {
        course.addEventListener('click', () => {
          const courseNum = course.getAttribute('data-num');
          addCourse(courseNum);
        });
      }
    }
  };
 }
