import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "components/ReservationList.css";
import Row from "components/ReservationRow";

const ReservationList =()=>{
    const [list,setList] = useState(null);
    const [loading,setLoading] = useState(false);

    
    useEffect(() =>{
    // async를 사용하는 함수 따로 선언
    const fatchData = async ()=> {
        setLoading(true);
        try {
            const response = await axios.get(
                'http://localhost:9003/homestays/mypage/reservations/all/686/1'
            );
            setList(response.data.reservations);
            console.log(response.data.reservations);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };
    fatchData();
    }, []); 

    if (loading) {
        return <p>값을 불러오는 중입니다..</p>;
    }
     //articles 값이 설정되지 않았을때
    if (!list) {
     return null;
    }
     // articles 값이 유효할때
     let appoval = list.appoval;
        return (
            <div>
                <table className="reservationTable">
                    <caption><h1>예약확인</h1></caption>
                    <thead>
                        <tr>
                        <th id="writeDay">예약 날짜</th>
                        <th id="homestayName">장소</th>
                        <th id="person">숙박기간</th>
                        <th id="approval">승인 현황</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((list,index)=>
                            (<Row
                            homeStayNum = {list.homeStayReservationNum}
                            writeday = {list.writeday}
                            title = {list.homeTitle}
                            checkIn = {list.checkInDay}
                            checkOut = {list.checkOutDay}
                            approval = {list.approval}
                            key ={index}
                            />)
                            )}
                        <Row/>
                    </tbody>
                </table>
            </div>
        )
}

export default ReservationList;