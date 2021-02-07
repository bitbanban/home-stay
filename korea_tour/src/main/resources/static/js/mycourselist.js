'use strict';

const totalCount = document.querySelector(".count-box");
const printBox = document.querySelector("#printBox");




function myAnswerList(){
    var xhr = new XMLHttpRequest();
    var url = '/api/tourmypage/courses/1';
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
                    who = '혼자';
                    break;
                case 'W2':
                    who = '가족';
                    break;
                case 'W3':
                    who = '연인';
                    break;
                case 'W4':
                    who = '우정';
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
                }
                switch (item[i].how) {
                case 'H1':
                    how = '뚜벅이';
                    break;
                case 'H2':
                    how = '자전거';
                    break;
                case 'H3':
                    how = '자동차';
                    break;
                case 'H4':
                    how = '기차';
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
            printBox.innerHTML=s;
            
            
            
            
            let courseCount = item.length;
            totalCount.innerText = "총"+courseCount+"건";
            console.log(courseCount);
            
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

myAnswerList();



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