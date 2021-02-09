import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationHostInfo = () => {
    
    const [hostInfo,setHostInfo] = useState(null);
    const [loading,setLoading] = useState(false);
    
    let reservationUrl = window.location.href;
    let reservationNum = reservationUrl.split('detail:')[1];

    useEffect(() =>{
    // async를 사용하는 함수 따로 선언
    const fatchData = async ()=> {
        setLoading(true);
        try {
            const response = await axios.get(
                'http://localhost:9003/homestays/mypage/reservation/detail/homeStay/summary/'+reservationNum
            );
            setHostInfo(response.data);
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
   if (!hostInfo) {
    return null;
   }
   // articles 값이 유효할때 
    return (
          <div>
            <img src={hostInfo.photoName}/>
            <b>{hostInfo.homTitle}</b>
            <b>{hostInfo.hostName}</b>
            <b>{hostInfo.addr2}</b>
          </div>

      );
}

export default ReservationHostInfo;