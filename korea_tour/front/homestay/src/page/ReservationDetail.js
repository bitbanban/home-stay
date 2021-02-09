import React,{ useEffect }  from 'react';
import axios from 'axios';

import ReservationContent from "components/ReservationContent";
import ReservationButton from "components/ReservationButton";
import ReservationHostInfo from "components/ReservationHostInfo";

const ReservationDetail = () =>{
  let reservationUrl = window.location.href;
  let reservationNum = reservationUrl.split('detail:')[1];

  const cancelRe = async () => {
  try {
    const response = await axios.patch(
      `http://localhost:9003/homestays/mypage/reservation/customer/cancel/${reservationNum}`
    ,{});
    alert("예약이 취소되었습니다.");

     
  } catch (e) {
    console.log(e);
    
   }
  };
    return (
        <div>
          <ReservationHostInfo/>
          <ReservationContent/>
          <ReservationButton 
           patchNum={cancelRe}/>
        </div>
    )
}


export default ReservationDetail;