'use strict';

const totalCount = document.querySelector(".count-box");
const printBox = document.querySelector("#printBox");

const perBlock = 5;
let currentPage;
let startPage;
let endPage;


function myCourseList(currentPage){
    if (currentPage == undefined) currentPage = 1;
    var xhr = new XMLHttpRequest();
    var url = `/api/tourmypage/courses/${currentPage}`;
    xhr.open('GET', url);
    xhr.send();
    console.log(url);

    xhr.onreadystatechange = function(){
        if (this.readyState == 4) {
            let data = JSON.parse(this.responseText);
            let item = data.list;
            console.log(item);
            
            let s=" ";
            for(let i=0; i<item.length; i++){
                let couseName = item[i].name;
                let addr = item[i].addr1;
                let firstImage = item[i].firstImage;
                let courseNum = item[i].courseNum;
                let who;
                let during;
                let how;
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
                switch (item[i].addr1) {
                case null:
                    addr = '관광지를 추가해 주세요!!'
                    break;
                }
                
                s+="<div class='courselist-box'>";
                s+="<div class='image-box'>";
                s+=`<img src=${firstImage} onerror="this.src='/img/noimage.png'">`
                s+="</div>";
                s+="<div class='courselist-info__box'>";
                s+="<div class='courselist-info'>";
                s+=`<p class='courselist-name' onclick='location.href="/tourmypage/courselist/detail?courseNum=${courseNum}"'>${couseName}</p>`;
                s+="<p class='courselist-start'>"+addr+"</p>";
                s+="<span>#"+during+"</span><span>#"+who+"</span><span>#"+how+"</span>";
                s+="</div>";
                s+=`<i class='fas fa-trash-alt courselist-icon' onclick='deleteCourse(${courseNum})'></i>`;
                s+="</div>";
                s+="</div>";
                
                s+="<hr class='hr2'>";
                
                
            }   
            s+="<div class='pageing-box'>";
            s+=`<div class="pagination" th:currentPage=${currentPage}></div>`
            s+="</div>";
            printBox.innerHTML=s;
            
            
            
            
            let courseCount = item.length;
            totalCount.innerText = "총"+courseCount+"건";
            console.log(courseCount);

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
                myCourseList(pageNum);
                });
            }
            
        }
    
    }
}

function deleteCourse(num){
    var delxhr = new XMLHttpRequest();
    var delurl = '/api/courses/'+num;
    delxhr.open('DELETE', delurl);
    delxhr.send();

    delxhr.onreadystatechange = function(){
        if (this.readyState == 4) {
            location.href = location.href;
        }
    }
}

myCourseList(currentPage);



function createCourse(){
    var delxhr = new XMLHttpRequest();
    var delurl = '/api/courses/'
    delxhr.open('POST', delurl);
    delxhr.onreadystatechange = function(){
        if (this.readyState == 4) {
            location.href = location.href;
        }
    }
    delxhr.send();
}


//코스추가



function showInput(){
    document.getElementById('makeCourseBox').classList.toggle('hide');
    document.getElementById('makeCourseBox').classList.toggle('show');
    document.getElementById('makeCourse').classList.toggle('hide');
}



function reload(){
    location.href=location.href;
}
