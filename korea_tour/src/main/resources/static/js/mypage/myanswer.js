'use strict';

const totalCount = document.getElementById("totalCount");
const answerBox = document.querySelector(".count-box__answer-text");
const reanswerBox = document.querySelector(".count-box__reanswer-text");
const printBox = document.querySelector("#printBox");

const perBlock = 5;
let currentPage;
let startPage;
let endPage;

function myAnswerList(currentPage){
   if (currentPage == undefined) currentPage = 1;
    var xhr = new XMLHttpRequest();
    var url = `/api/tourmypage/answer/${currentPage}`;
    xhr.open('GET', url);
    xhr.send();
    console.log(url);

    xhr.onreadystatechange = function(){
        if (this.readyState == 4) {
            let data = JSON.parse(this.responseText);
            let item = data.myanswer;
            
            
            console.log(item);
            
             let s=" ";
             for(let i=0; i<item.length; i++){
                 let loginId = item[i].loginId;
                 let content = item[i].content;
                 let loginPhoto = item[i].loginPhoto;
                 let writeday = item[i].writeDay;
                 let title = item[i].title;
                 let contentId = item[i].contentId;
                 let tourAnswerNum = item[i].tourAnswerNum;
                 let deleted = item[i].deleted;
                 let courseNum = item[i].courseNum;
                 let name = item[i].name;
                 s+="<div class='answer-box'>";
                 s+="<div class='image-box'>";
                 s+="<img src='"+loginPhoto+"' alt='"+loginId+"'>";
                 s+="</div>";
                 s+="<div class='answer-info__box'>";
                 s+="<div class='answer-info'>";
                 if(title==null && name!=null){
                    s+=`<p class='answer-name' onclick='location.href="/tourcourse/detail?contentId=${courseNum}"'>${name}</p>`;
                 }else if(title==null && name==null){
                    s+=`<p class='answer-name' '>삭제된 코스입니다</p>`;
                 } else{
                    s+=`<p class='answer-name' onclick='location.href="/tourplace/detail?contentId=${contentId}"'>${title}</p>`;
                 }
                 if(deleted==1){
                    s+="<p class='answer-start' style='color:red'>사용자가 삭제한 글 입니다.</p>";
                 }else if(deleted==2){
                    s+="<p class='answer-start' style='color:red'>관리자가 삭제한 글 입니다.</p>";
                 }else{
                    s+="<p class='answer-start'>"+content+"</p>";
                 }
                 s+="<span>"+loginId+"</span><span>|</span><span>"+writeday+"</span>";
                 s+="</div>";
                 if(deleted == 0){
                    s+="<i class='fas fa-trash-alt answer-icon' onclick='deleteAnswer("+tourAnswerNum+")'></i>";
                 }
                 s+="</div>";
                 s+="</div>";
                 s+="<hr class='hr2'>";
               
                
                
             }
            s+="<div class='pageing-box'>";
            s+=`<div class="pagination" th:currentPage=${currentPage}></div>`
            s+="</div>";  
             printBox.innerHTML=s;
            
            
            
            let answerCount = item.length;
            totalCount.innerText = "총"+answerCount+"건";
            console.log(answerCount);
            answerBox.style.color="black";
            answerBox.style.fontSize="1.1em";
            reanswerBox.style.color="#98938d";
            reanswerBox.style.fontSize="1em";

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
               myAnswerList(pageNum);
            });
            }
        }
    
    }
}

function reAnserList(currentPage){
   if (currentPage == undefined) currentPage = 1;
    var xhr = new XMLHttpRequest();
    var url = `/api/tourmypage/reanswer/${currentPage}`;
    xhr.open('GET', url);
    xhr.send();
    console.log(url);

    xhr.onreadystatechange = function(){
        if (this.readyState == 4) {
            let data = JSON.parse(this.responseText);
            let item = data.myReanswer;
            console.log(item);
            
             let c=" ";
             for(let i=0; i<item.length; i++){
                 let loginId = item[i].loginId;
                 let content = item[i].content;
                 let loginPhoto = item[i].loginPhoto;
                 let writeday = item[i].writeDay;
                 let title = item[i].title;
                 let contentId = item[i].contentId;
                 let tourAnswerNum = item[i].tourAnswerNum;
                 let deleted = item[i].deleted;
                 let courseNum = item[i].courseNum;
                 let name = item[i].name;
                 c+="<div class='answer-box'>";
                 c+="<div class='image-box'>";
                 c+="<img src='"+loginPhoto+"' alt='"+loginId+"'>";
                 c+="</div>";
                 c+="<div class='answer-info__box'>";
                 c+="<div class='answer-info'>";

                 if(title==null && name!=null){
                    c+=`<p class='answer-name' onclick='location.href="/tourcourse/detail?contentId=${courseNum}"'>${name}</p>`;
                 }else if(title==null && name==null){
                    c+=`<p class='answer-name' '>삭제된 코스입니다</p>`;
                 } else{
                    c+=`<p class='answer-name' onclick='location.href="/tourplace/detail?contentId=${contentId}"'>${title}</p>`;
                 }


                 if(deleted==1){
                    c+="<p class='answer-start' style='color:red'>사용자가 삭제한 글 입니다.</p>";
                 }else if(deleted==2){
                    c+="<p class='answer-start' style='color:red'>관리자가 삭제한 글 입니다.</p>";
                 }else{
                    c+="<p class='answer-start'>"+content+"</p>";
                 }
                 
                 c+="<span>"+loginId+"</span><span>|</span><span>"+writeday+"</span>";
                 c+="</div>";
                 if(deleted==0){
                    c+="<i class='fas fa-trash-alt answer-icon' onclick='deleteReAnswer("+tourAnswerNum+")'></i>"; 
                 }
                 c+="</div>";
                 c+="</div>";
                 c+="<hr class='hr2'>";
               
                
             }   
            c+="<div class='pageing-box'>";
            c+=`<div class="pagination" th:currentPage=${currentPage}></div>`
            c+="</div>"; 
             printBox.innerHTML=c;
            
            
            
            
            let reAnswerCount = item.length;
            totalCount.innerText = "총"+reAnswerCount+"건";
            console.log(reAnswerCount);
            reanswerBox.style.color="black";
            reanswerBox.style.fontSize="1.1em";
            answerBox.style.color="#98938d";
            answerBox.style.fontSize="1em";

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
               reAnserList(pageNum);
            });
            }
        }
    
    }
}

function deleteReAnswer(n){
    var xhr = new XMLHttpRequest();
    var url = '/api/tourmypage/answer/'+n;
    xhr.open('POST', url);
    
  
    xhr.onreadystatechange = function(){
        if (this.readyState == 4) {
            
            reAnserList();
        }
      }
      xhr.send();
    }

    function deleteAnswer(n){
        var xhr = new XMLHttpRequest();
        var url = '/api/tourmypage/answer/'+n;
        xhr.open('POST', url);
        
      
        xhr.onreadystatechange = function(){
            if (this.readyState == 4) {
                myAnswerList();
            }
          }
          xhr.send();
        }   


myAnswerList(currentPage);