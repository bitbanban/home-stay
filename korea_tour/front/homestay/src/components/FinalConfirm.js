import React from 'react';
import './HouseDetailCss/FinalConfirm.css';

function FinalConfirm(props) {

    return (
        <div>
            최종확인
            <p>이름</p>
            <p>전화번호</p><input></input>
            <p>생년월일</p>
            <select id="select_year"></select>
            <select id="select_month"></select>
            <select id="select_day"></select>



        </div>
    );
}

export default FinalConfirm;