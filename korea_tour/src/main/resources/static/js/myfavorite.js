'use strict';

const placeMark = document.getElementById("placeMark");
const courseMark = document.getElementById("courseMark");
const totalCount = document.getElementById("totalCount");
const t1 = document.querySelector("#t1");

const perBlock = 5;
let currentPage;
let startPage;
let endPage;




    function placeMarkspage(currentPage){
    if (currentPage == undefined) currentPage = 1;
    var xhr = new XMLHttpRequest();
    var url = `/api/tourmypage/placemarks/${currentPage}`;
    xhr.open('GET', url);
    xhr.send();
    console.log(url);

    xhr.onreadystatechange = function(){
        if (this.readyState == 4) {
            
            let data = JSON.parse(this.responseText);
            let item = data.list;
            let s=" ";
            for(let i=0; i<item.length; i++){
                let titles = item[i].title;
                let addrs = item[i].addr1;
                let firstImages = item[i].firstImage;
                let contentId = item[i].contentId;
                let markNum = item[i].markNum;
                
                s+="<div class='favorite-infobox'>";
                s+="<div class='image-box'>";
                s+=`<img src=${firstImages} alt=${titles} onerror="this.src='/img/noimage.png'">`;
                s+="</div>";
                s+="<div class='favorite-info__box'>";
                s+="<div class='favorite-info'>";
                s+=`<p class='favorite-name' onclick='location.href="/tourplace/detail?contentId=${contentId}"'>${titles}</p>`;
                s+="<p class='favorite-start'>"+addrs+"</p>";
                s+="</div>";
                s+=`<i class='fas fa-trash-alt favorite-icon' onclick='deleteFavoritePlace(${markNum})'></i>`;
                s+="</div>";
                s+="</div>";
                s+="<hr class='hr2'>";
            }
            s+="<div class='pageing-box'>";
            s+="<div class='pagination' th:currentPage="+currentPage+"></div>";
            s+="</div>";   
            t1.innerHTML=s;

                
            let placeCount = data.list.length;
            totalCount.innerText = "총"+placeCount+"건";
            placeMark.style.color="black";
            placeMark.style.fontSize="1.1em";
            courseMark.style.color="#98938d";
            courseMark.style.fontSize="1em";

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
                placeMarkspage(pageNum);
                });
            }
        }
    }
    
};

function deleteFavoritePlace(n){
  var xhr = new XMLHttpRequest();
  var url = '/api/placemarks/'+n;
  xhr.open('DELETE', url);
  
  console.log(url);

  xhr.onreadystatechange = function(){
      if (this.readyState == 4) {
          placeMarkspage(currentPage);

      }
    }
    xhr.send();
  }


function courseMarkForm(currentPage){
    if (currentPage == undefined) currentPage = 1;
    var xhr = new XMLHttpRequest();
    var url = `/api/tourmypage/coursemarks/${currentPage}`;
    xhr.open('GET', url);
    xhr.send();
    console.log(url);

    xhr.onreadystatechange = function(){
        if (this.readyState == 4) {
            let data = JSON.parse(this.responseText);
            let item = data.list;
            let c=" ";
            for(let i=0; i<item.length; i++){
                let names = item[i].name;
                let title = item[i].title;
                let firstImages = item[i].firstImage;
                
                let courseNum = item[i].courseNum;
                let who;
                let during;
                let how;
                let courseMarkNum = item[i].courseMarkNum;
               
                console.log(`who ${item[i].who}`);
                switch (item[i].who) {
                case 'W1':
                    who = '혼자여행';
                    break;
                case 'W2':
                    who = '가족여행';
                    break;
                case 'W3':
                    who = '커플여행';
                    break;
                case 'W4':
                    who = '우정여행';
                    break;
                case null:
                    who = '테마를 지정하세요'
                    break;
                }
                switch (item[i].during) {
                case 'D1':
                    during = '당일치기';
                    break;
                case 'D2':
                    during = '1박2일';
                    break;
                case 'D3':
                    during = '2박3일 이상';
                    break;
                case null:
                    during = '테마를 지정하세요'
                    break;
                }
                switch (item[i].how) {
                case 'H1':
                    how = '뚜벅이';
                    break;
                case 'H2':
                    how = '자전거';
                    break;
                case 'H3':
                    how = '드라이브';
                    break;
                case 'H4':
                    how = '기차여행';
                    break;
                case null:
                    how = '테마를 지정하세요'
                    break;
                }
                
                c+="<div class='favorite-infobox'>";
                c+="<div class='image-box'>";
                c+=`<img src=${firstImages} alt=${names} onerror="this.src='/img/noimage.png'">`;
                c+="</div>";
                c+="<div class='favorite-info__box'>";
                c+="<div class='favorite-info'>";
                c+=`<p class='favorite-name' onclick='location.href="/tourcourse/detail?courseNum=${courseNum}"'>${names}</p>`;
                c+="<p class='favorite-start'>"+title+"</p>";
                c+="<span class='favortie-tema'>#"+who+"</span>";
                c+="<span class='favortie-tema'>#"+during+"</span>";
                c+="<span class='favortie-tema'>#"+how+"</span>";
                c+="</div>";
                c+="<i class='fas fa-trash-alt favorite-icon' onclick='deleteFavoriteCourse("+courseMarkNum+")'></i>";
                c+="</div>";
                c+="</div>";
                c+="<hr class='hr2'>";
            }   
            c+="<div class='pageing-box'>";
            c+="<div class='pagination' th:currentPage="+currentPage+"></div>";
            c+="</div>";
            t1.innerHTML=c;
            
           
            let courseCount = data.list.length;
            totalCount.innerText = "총"+courseCount+"건";
            courseMark.style.color="black";
            courseMark.style.fontSize="1.1em";
            placeMark.style.color="#98938d";
            placeMark.style.fontSize="1em";

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
                courseMarkForm(pageNum)
                });
            }
        }
    
    }
}


function deleteFavoriteCourse(n){
    var xhr = new XMLHttpRequest();
    var url = '/api/coursemarks/'+n;
    xhr.open('DELETE', url);
    
    console.log(url);

    xhr.onreadystatechange = function(){
        if (this.readyState == 4) {

          location.href = location.href;

        }
      }
      xhr.send();
    }



courseMarkForm(currentPage);