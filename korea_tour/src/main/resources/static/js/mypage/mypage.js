'use strict';

const myCoursePage = document.getElementById('mainCourseBox');
const myFavoritePage = document.getElementById('mainFavoriteBox');
const myAnswerPage = document.getElementById('mainAnswerBox');

const myTotalMark = document.querySelector("#myTotalMark");
const myTotalCourse = document.querySelector("#myTotalCourse");
const myTotalAnswer = document.querySelector("#myTotalAnswer");

const logoutBtn = document.querySelector("#logoutBtn");

myCoursePage.addEventListener('click', e => {
  location.href = '/tourmypage/courselist';
});

myFavoritePage.addEventListener('click', e => {
  location.href = '/tourmypage/favorite';
});

myAnswerPage.addEventListener('click', e => {
  location.href = '/tourmypage/answer';
});




var xhr = new XMLHttpRequest();
var url = '/api/tourmypage';
xhr.open('GET', url);
xhr.send();

xhr.onreadystatechange = function(){
  if (this.readyState == 4) {
    let data = JSON.parse(this.response);
    let totalMark = data.totalMark;
    let totalmycourse = data.totalmycourse;
    let totalmyanswer = data.totalmyanswer;
    
    
    myTotalCourse.innerText = totalmycourse;
    myTotalMark.innerText = totalMark;
    myTotalAnswer.innerText = totalmyanswer;

    
  }
  
}


logoutBtn.addEventListener('click', e => {
  var xhr = new XMLHttpRequest();
    var url = '/logout';
    xhr.open('GET', url);
    xhr.send();

    xhr.onreadystatechange = function(){
        if (this.readyState == 4) {
           location.href = '/';
        }
      }

});