# [라온나드리](http://raonnadri.tk)
2021년 1월 11일 ~ 2021년 2월 15일 

## 팀명 
비트오대삼 

## 프로젝트소개
라온나드리는 대한민국 관광지를 소개하는 웹사이트입니다. 지역별로 관광지를 소개하며 현재 개최하는 지역행사를 안내합니다. 또한 관심있는 관광지를 골라 나만의 코스를 만들어 공유할 수 있습니다.

## 팀소개
* **PL** 최보라 
* **front-end** 소다미,이승민,정수진,최보라
* **back-end** 김경오,도가영,박진우,이지영

## 사용기술
**Front-end** : HTML,CSS,JavaScript,thymeleaf  
**Back-end** : Spring boot, Java, AWS, Mybatis, Maven  
**Open API** : 공공데이터API(국문관광지정보), 카카오 API (로그인,지도), 네이버 로그인 API, 구글 로그인 API  
**DB** : MySql  
**Tools** : Eclipes, VScode, MySQL workbench, SourceTree, Notion, Slack, postman,discode,chrome remote desktop  

## 기능 소개

### 메인화면

- 통합검색창을 통해 관광지와 코스 검색을 할 수 있습니다.
- 맞춤코스로 원하는 조건의 코스를 추천해줍니다.
- 최신 공지사항 3가지를 볼수 있으며 클릭시 상세페이지로 이동합니다.

### 검색,코스,축제 목록

- 페이징 처리를 통해 데이터를 부분적으로 받아와 로딩 속도를 개선했습니다.
- 정렬 방식 또는 카테고리 선택시 새로운 데이터를 비동기 방식으로 처리하여 필요한 부분만 재랜더링 합니다.
  ![ezgif com-gif-maker (11)](https://user-images.githubusercontent.com/66766189/111464487-2c9e8e00-8764-11eb-9c0e-1943942fc11c.gif)

 
### 관광지 상세

- 코스를 만들어 관광지를 추가할 수 있습니다.



- 관광지를 즐겨찾기하여 마이페이지에서 확인할 수 있습니다.
- 좋아요로 관광지를 평가할 수 있습니다.

![ezgif com-gif-maker (10)](https://user-images.githubusercontent.com/66766189/111464521-33c59c00-8764-11eb-9835-2794f3a39feb.gif)



### 축제 메인

- 현재 날짜와 축제일정을 비교하여 해당 날짜의 진행 중인 축제를 표시합니다.  
![ezgif com-gif-maker (9)](https://user-images.githubusercontent.com/66766189/111464513-30caab80-8764-11eb-9291-47329cac035e.gif)


### 마이페이지 코스 수정

- DOM요소를 조작 하여 관광지의 순서 변경과 삭제를 할 수 있습니다.  
![ezgif com-gif-maker (8)](https://user-images.githubusercontent.com/66766189/111464527-358f5f80-8764-11eb-8d0b-b5885689d7f1.gif)


---
## 버전
배포 2021.02.14
리팩토링 진행중 2021.02.14~
