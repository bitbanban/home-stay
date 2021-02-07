'use strict';

const totalCount = document.getElementById("totalCount");
const answerBox = document.querySelector(".count-box__answer-text");
const reanswerBox = document.querySelector(".count-box__reanswer-text");
const printBox = document.querySelector("#printBox");

function myAnswerList(){
    var xhr = new XMLHttpRequest();
    var url = '/api/tourmypage/answer/1';
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
             printBox.innerHTML=s;
            
            
            
            let answerCount = item.length;
            totalCount.innerText = "총"+answerCount+"건";
            console.log(answerCount);
            answerBox.style.color="black";
            answerBox.style.fontSize="1.1em";
            reanswerBox.style.color="#98938d";
            reanswerBox.style.fontSize="1em";
        }
    
    }
}

function reAnserList(){
    var xhr = new XMLHttpRequest();
    var url = '/api/tourmypage/reanswer/1';
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
             printBox.innerHTML=c;
            
            
            
            
            let reAnswerCount = item.length;
            totalCount.innerText = "총"+reAnswerCount+"건";
            console.log(reAnswerCount);
            reanswerBox.style.color="black";
            reanswerBox.style.fontSize="1.1em";
            answerBox.style.color="#98938d";
            answerBox.style.fontSize="1em";
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


myAnswerList();