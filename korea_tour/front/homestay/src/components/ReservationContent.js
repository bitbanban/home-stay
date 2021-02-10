import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationContent = () =>{

       const [content,setContent] = useState(null);
       const [loading,setLoading] = useState(false);
       
       let reservationUrl = window.location.href;
       let reservationNum = reservationUrl.split('reservation/')[1];

   useEffect(() =>{
       // async를 사용하는 함수 따로 선언
       const fatchData = async ()=> {
           setLoading(true);
           try {
               const response = await axios.get(
                   'http://localhost:9003/homestays/mypage/reservation/detail/'+reservationNum
               );
               setContent(response.data);
               console.log(response.data)
           } catch (e) {
               console.log(e);
           }
           setLoading(false);
       };
       fatchData();
   }, []); 

   if (loading) {
       return <p>대기중....</p>;
   }
   //articles 값이 설정되지 않았을때
   if (!content) {
    return null;
   }
   // articles 값이 유효할때
   let approval = content.approval;
   return (

    <div>
    <b>예약자명 : </b>{content.customName}
    <br/>
    <b>e-mail : </b>{content.email1}@{content.email2}
    <br/>
    <b>신청날짜 : </b>{content.writeday}
    <br/>
    <b>체크인 : </b>{content.checkInDay}
    <br/>
    <b>체크아웃 : </b>{content.checkOutDay}
    <br/>
    <b>인원수 : </b>{content.numberOfPeople}
    <br/>
    <b>예약여부 : </b>
        {approval===0
        ? 
        "예약대기"
        : (approval===1
            ? "예약취소"
            :"예약승인")
         } 
    <br/>
    <b>총금액 : </b>{content.totalPrice}
    </div>

    

   )

}

export default ReservationContent;