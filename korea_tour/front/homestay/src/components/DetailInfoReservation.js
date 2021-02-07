import React from 'react';

import './HouseDetailCss/DetailInfo.css';

import DetailInfo from './DetailInfo';
import DetailReservation from './DetailReservation';

function DetailInfoReservation(props) {
    return (
        <>
        <div id="DetailInfo-Reservation">
            <div id="DetailInfo-MainBox">
                

                <DetailInfo />

                
                <br/>
            </div>







            <div id="Reservation-MainBox">
                <DetailReservation />
            </div>
        </div>
        </>
    );
}

export default DetailInfoReservation;