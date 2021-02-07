'use strict';



 let linkurl = document.location.href;
 let courseNum = linkurl.split('=');
 let num = courseNum[1];
 let userLoginNum=document.getElementById("userLoginNum").getAttribute("value");
 let loginId=document.getElementById("userId").getAttribute("value");
 let loginPhoto=document.getElementById('userPhotoGo').getAttribute("value");
 let content=document.getElementById('textBox').value;
 console.log(num,userLoginNum,loginId,loginPhoto,content);




 // // 댓글입력
 function insertAnswer() {
     let xhr = new XMLHttpRequest();
     let url = `/api/courseanswer`;
     xhr.open('POST', url);
     xhr.setRequestHeader('Content-type', 'application/json');
     //3.post방식일경우 서버로 보내고 싶은 데이터 적기
     //xhr.send('데이터내용');
     //ex xhr.send(JSON.stringify({ id: 4, content: 'Angular', completed: true }));
     let js ={"courseNum":num,"loginNum":userLoginNum,"loginId":loginId,"loginPhoto":loginPhoto,"content":content};
     console.log(js);
     xhr.send(JSON.stringify(js));  
     //4.서버로 보낸 요청에 대한 응답을 받았을 때 어떤 동작을 할 것인지 정하기
     xhr.onreadystatechange = createAnswer();
    
     function createAnswer(){
         // 서버의 응답에 따른 로직을 여기에 작성합니다.
         //5-1. 응답준비가 안됐을때 return ,그렇지 않을경우 아래 if 문 수행
         if (xhr.readyState !== XMLHttpRequest.DONE) return;
         //5-2.http 상태코드에 따른 로직 작성 
         if(xhr.status === 201) { // 201: post 일경우 Created
             console.log(num,userLoginNum,loginId,loginPhoto,content); //새로고침해야하나?
         } else {
             console.log("Error!");
             }
         }
         location.href = location.href;
     }

  //textarea 글 저장
 const forceOut =(e)=>{
     content = e;
  }





  //댓글출력
const answerCount = document.getElementById("answerCount");
const printAnswer = document.getElementById("printAnswer");


function myAnswerList(){
    var answerxhr = new XMLHttpRequest();
    var answerurl = '/api/courses/'+num;
    answerxhr.open('GET', answerurl);
    answerxhr.send();

    console.log(answerurl);

    answerxhr.onreadystatechange = function(){
        if (this.readyState == 4) {
            let data = JSON.parse(this.responseText);
            let item = data.tourAnswerDto;
            console.log(data);
            console.log(item);
            let totalAnswer = item.length;
            answerCount.innerHTML = `<i class="far fa-comment-dots"></i>&nbsp;여행톡 ${totalAnswer}`;
              let s=" ";
            
              for(let i=0; i<item.length; i++){
                  let loginId = item[i].loginId;
                  let content = item[i].content;
                  let loginPhoto = item[i].loginPhoto;
                  let writeday = item[i].writeDay;
                  let deleted = item[i].deleted;
                  let regroup = item[i].regroup;
                  let relevel = item[i].relevel;
                  let tourAnswerNum = item[i].tourAnswerNum;
                  let loginNum = item[i].loginNum;
                  if(relevel==0){
                  s+=`<div class="answer-box">`;
                
                    s+=`<div class="profile-text-icon">`;
                      s+=`<div class="profile-box"><img src="${loginPhoto}" alt="${loginId}"></div>`;
                      s+=`<div class="text-icon">`;
                        s+=`<div class="text-box">`;
                          if(deleted == 1){
                            s+=`<p style="color:red">사용자가 삭제한 댓글입니다.</p>`;
                          }else if(deleted == 2){
                            s+=`<p style="color:red">관리자가 삭제한 댓글입니다.</p>`;
                          }else{
                            s+=`<p>${content}</p>`;
                            s+=`<p><span style="margin-right: 5px;">${loginId}</span>|<span style="margin-left: 5px;">${writeday}</span></p>`;
                          }
                        s+=`</div>`;
                        if(deleted == 0 && userLoginNum == loginNum){
                          s+=`<div class="icon-box" onclick="deleteAnswer(${tourAnswerNum})"><i class='fas fa-trash-alt answer-delete-icon'></i></div>`;
                        }
                        
                      s+=`</div>`;
                    s+=`</div>`;
                    //답글 버튼
                    if(deleted == 0){
                      s+=`<div class="reanswer-btn" name="${regroup}" onclick="ReAnswer(this)">답글</div>`;
                    }
                    //답글 담는 div
                    s+=`<div class="reanswer-mainbox hide-btn">`;
                          //답글 입력폼
                        s+=`<div class="create-ReAnswerBox">`;
                          s+="<input type='hidden' id='reUserLoginNum' name='reLoginNum' th:value=${session.user.userNum}></input>";
                          s+="<input type='hidden' id='reUserId' name='reLoginId' th:value=${session.user.name}></input>";
                          s+="<input type='hidden' id='reUserPhotoGo' name='reLoginPhoto' th:value=${session.user.photo}></input>";
                          s+=`<textarea class="reTextBox" name="textBox" onblur="ReforceOut(this.value)" placeholder="답글을 남겨주세요."></textarea>`;
                          s+=`<button class="reAnswer-push" onclick="insertReAnswer()">보내기</button>`;
                        s+=`</div>`;
                    s+=`</div>`;
                  s+=`</div>`;
                  }  

                  //답급 출력폼
                        
                  if(relevel==1){

                      s+=`<div class="reanswer-box">`;
                      s+=`<div class="reprofile-box"><img src="${loginPhoto}" alt="${loginId}"></div>`;
                      s+=`<div class="retext-icon">`;
                      s+=`<div class="retext-box">`;
                      if(deleted == 1){
                        s+=`<p style="color:red">사용자가 삭제한 답글입니다.</p>`;
                      }else if(deleted == 2){
                        s+=`<p style="color:red">관리자가 삭제한 답글입니다.</p>`;
                      }else{
                        s+=`<p>${content}</p>`;
                        s+=`<p><span style="margin-right: 5px;">${loginId}</span>|<span style="margin-left: 5px;">${writeday}</span></p>`;
                      }
                      s+=`</div>`;
                      if(deleted == 0 && userLoginNum == loginNum){
                        s+=`<div class="reicon-box" onclick="deleteAnswer(${tourAnswerNum})"><i class='fas fa-trash-alt answer-delete-icon'></i></div>`;
                      }
                      s+=`</div>`;
                      s+=`</div>`;
                      s+=`<hr class="hr3">`;
                  }
                  
              }   
               
            printAnswer.innerHTML=s;
            
              
            
            const reanswerBtns = document.querySelectorAll(".reanswer-btn");
            for(const reanswerBtn of reanswerBtns){
                reanswerBtn.addEventListener("click", ()=>{
                    reanswerBtn.nextElementSibling.classList.toggle("show-btn");
                    reanswerBtn.nextElementSibling.classList.toggle("hide-btn");
                })
            }

        }
    }
    

}

myAnswerList();


let regroupId;

const ReAnswer =(f)=>{
  regroupId = f.getAttribute("name");
  //const regroupId = reanswerBtn.getAttribute("name");
}

// 답글입력
function insertReAnswer() {

let reUserNum=document.getElementById("userLoginNum").getAttribute("value");
let reLoginId=document.getElementById("userId").getAttribute("value");
let reLoginPhoto=document.getElementById('userPhotoGo').getAttribute("value");
let restepId;

 const insertReanswerBtns=document.querySelectorAll(".reanswer-btn"); //  queryselectorAll로  모든 입력버튼 선택
  for(const insertReanswerBtn of insertReanswerBtns){ //답글 입력 버튼 각각에 이벤트 주기위해서 for 문 돌리기
    insertReanswerBtn.addEventListener("click",   ()=>{ //답글 입력버튼을 클릭했을때
    restepId = insertReanswerBtn.lastChild.getAttribute("value"); //맨마지막 자식 노드의 restep값 가져오기
  if(restepId = undefined) 
    restepId=0;
  })
}


   //1.JavaScript를 이용하여 서버로 보내는 HTTP request 인스턴스 생성하기
let xhr = new XMLHttpRequest();
let url = `/api/coursereanswer`;
//2.xhr.open(전송방식,url,비동기로 수행될지 (생략가능))
xhr.open('POST', url);
xhr.setRequestHeader('Content-type', 'application/json');
//3.post방식일경우 서버로 보내고 싶은 데이터 적기
//xhr.send('데이터내용');
//ex xhr.send(JSON.stringify({ id: 4, content: 'Angular', completed: true }));
let ReAn ={"courseNum":num,"loginNum":reUserNum,"loginId":reLoginId,"loginPhoto":reLoginPhoto,"content":RContent,"regroup":regroupId,"restep":restepId};
xhr.send(JSON.stringify(ReAn));
console.log(num,reUserNum,reLoginId,reLoginPhoto,RContent,regroupId,restepId);
// location.reload();

//4.서버로 보낸 요청에 대한 응답을 받았을 때 어떤 동작을 할 것인지 정하기
xhr.onreadystatechange = myFunction();

function myFunction(){
// 서버의 응답에 따른 로직을 여기에 작성합니다.
//5-1. 응답준비가 안됐을때 return ,그렇지 않을경우 아래 if 문 수행
if (xhr.readyState !== XMLHttpRequest.DONE) return;
//5-2.http 상태코드에 따른 로직 작성 
if(xhr.status === 201) { // 201: post 일경우 Created
    console.log(num,reUserNum,reLoginId,reLoginPhoto,RContent,regroupId,restepId);
   
  } else {
    alert("로그인 후 입력해 주세요!!")
  }
  
 }
 location.href = location.href;
}




   let RContent;
 const ReforceOut =(e)=>{
    document.querySelectorAll('.reTextBox').value; 
    const ReContents=document.querySelectorAll(".reTextBox");
     for(const ReContent of ReContents){ 
     ReContent.addEventListener("click",   ()=>{
     RContent = ReContent.value;  
   })
   RContent = e;
 } 
 }


 // 댓글삭제



function deleteAnswer(deleteTourAnswerNum) {
	//1.JavaScript를 이용하여 서버로 보내는 HTTP request 인스턴스 생성하기
let xhr = new XMLHttpRequest();
let url = '/api/tourmypage/answer/'+deleteTourAnswerNum;
//2.xhr.open(전송방식,url,비동기로 수행될지 (생략가능))
xhr.open('POST', url);
   xhr.onreadystatechange = function(){
            if (this.readyState == 4) {
              location.href = location.href;
            }
          }
          xhr.send();
        } 