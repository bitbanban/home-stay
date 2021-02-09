import React from 'react';
import { withRouter } from 'react-router-dom';

const ReservationRow  =(props)=> {
    
  let stayNum=props.homeStayNum;

        return (stayNum)
        ?
            <tr className="ReservationRow" onClick={() => {
                props.history.push(
                  `/homestay/mypage/Reservationdetail:${props.homeStayNum}`
                );
              }}> 
                <td>{props.writeday}</td>
                <td>{props.title}</td>
                <td>{props.checkIn}~{props.checkOut}</td>
                <td> 
                    {props.approval===0
                     ? 
                     "예약대기"
                     : (props.approval===1
                     ? "예약취소"
                     :"예약승인")
                    } 
                </td>
            </tr>
          :<div></div>      
    
}
export default withRouter(ReservationRow);