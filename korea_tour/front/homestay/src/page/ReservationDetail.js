import React,{ useEffect }  from 'react';
import { Route, Link } from 'react-router-dom';

import ReservationContent from "components/ReservationContent";
import ReservationButton from "components/ReservationButton";

const ReservationDetail = () =>{
    return (
        <div>
          
          <ReservationContent/>
          <ReservationButton/>
        </div>
    )
}


export default ReservationDetail;