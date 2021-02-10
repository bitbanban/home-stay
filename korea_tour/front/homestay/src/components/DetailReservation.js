import React, { useState, useEffect } from 'react';
import AddPerson from './AddPerson';



function DetailReservation(props) {
    
    return (
        <div>
            <h3>요금을 확인하려면 날짜를 입력하세요</h3>
                <div><AddPerson /></div>
                
        </div>
    );
}

export default DetailReservation;