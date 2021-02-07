'use strict';

var xhr = new XMLHttpRequest();
var url = `/api/notice/1`;
console.log(url);
xhr.open('GET', url);
xhr.send();
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    const data = JSON.parse(this.responseText);
    const noties = data.notices;
    console.log(noties);
    let p = '';
    for (let i = 0; i < 3; i++) {
      let title = noties[i].title;
      let writeday = noties[i].writeDay;
      let view = noties[i].views;

      p += `<tr><td><a href ="/notice/detail?noticeNum=${noties[i].noticeNum}">${title}</a></td>`;
      p += `<td>${writeday}</td>`;
      p += `<td>${view}</td></tr>`;
    }
    document.querySelector('#notice').innerHTML = p;
  }
};
