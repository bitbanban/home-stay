import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationContent = () =>{

       const [contents,setContents] = useState(null);
       const [loading,setLoading] = useState(false);
   

   useEffect(() =>{
       // async를 사용하는 함수 따로 선언
       const fatchData = async ()=> {
           setLoading(true);
           try {
               const response = await axios.get(
                   'http://localhost:9003/homeStays/mypage/reservation/detail/1'
               );
               setContents(response.data.content);
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
   if (!contents) {
    return null;
   }
   // articles 값이 유효할때
   return (
    <div>
        {contents.map(content => (
          <li key={content}>
          {content.customName} ({content.email1})
        </li>
        ))}
    <p>예약자명 : </p>
    <p>e-mail :</p>
    <p>신청날짜 :</p>
    <p>체크인 :</p>
    <p>체크아웃 :</p>
    <p>인원수 :</p>
    <p>승인여부 :</p>
    <p>총금액: </p>
    </div>

    

   )

}

export default ReservationContent;