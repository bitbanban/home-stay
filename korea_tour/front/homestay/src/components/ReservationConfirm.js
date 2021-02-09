import React from 'react';
import FinalConfirm from './FinalConfirm';
import TotalCost from './TotalCost';
import './HouseDetailCss/ReservationConfirm.css';

const ReservationConfirm=({ match }) => {
    return (
        <div>
            <h1>확인 및 결제 {match.params.loginNum}</h1>
            <div id="ReservationConfirm__Box">
                
                <FinalConfirm />
                <TotalCost />
            </div>
        </div>
    );
}

export default ReservationConfirm;