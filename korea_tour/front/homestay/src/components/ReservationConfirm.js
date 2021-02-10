import React, { useState, useEffect } from 'react';
import './HouseDetailCss/ReservationConfirm.css';
import store from '_store/Store';
import { URL } from '_utils/api';

const ReservationConfirm=({ match }) => {
    
    const userNum = store.getState().userReducer.num;
    const homeStayNum = match.params.homeStayNum;
    const checkInDay = match.params.checkInDay;
    const checkOutDay = match.params.checkOutDay;
    const numberOfPeople = match.params.numberOfPeople;
    const price = match.params.totalPrice;
    

    
    const totalPrice = parseInt(price);
    const priceWon = totalPrice.toLocaleString();
    

    console.log(price);
    console.log(priceWon);
    
    const postUrl = `${URL}/${homeStayNum}/reservation/guestdata`;
    

    return (
        <>
        <form action={postUrl} method="POST">
            <div id="ReservationConfirm__mainBox">
            
                <div id="reservationPerson">
                    <h1>예약자 정보</h1>

                    <p>이름</p>
                    <input type="text" name="name" />

                    <p>전화번호</p>
                    <input type="text" placeholder="- 를 빼고 입력해주세요." name="hp" />

                    <p>이메일</p>
                    <input type="text" name="email1" /><span>@</span><input type="text" name="email2" />

                    <p>생년월일</p>
                    <input type="number" name="birthYear"/><span>년</span>
                    <input type="number" name="birthMonth" /><span>월</span>
                    <input type="number" name="birthDay" /><span>일</span>

                    <p>성별</p>
                    <input type="radio" name="gender" value="M" checked/>
                    <b>남자</b>
                    <input type="radio" name="gender" value="F" />
                    <b>여자</b>
                </div>

                <div id="reservationInfo">
                    <h1>예약 정보 확인</h1>
                    <p>체크인 = {checkInDay}</p>
                    <input type="hidden" name="checkInDay" value={checkInDay} />
                    
                    <p>체크아웃 = {checkOutDay}</p>
                    <input type="hidden" name="checkOutDay" value={checkOutDay} />

                    <p>인원수 = {numberOfPeople}</p>
                    <input type="hidden" name="numberOfPeople" value={numberOfPeople} />

                    <p>총 가격 = ₩{priceWon}</p>
                    <input type="hidden" name="totalPrice" value={totalPrice} />

                    <input type="hidden" name="loginNum" value={userNum} />
                    <input type="hidden" name="homeStayNum" value={homeStayNum} />
                </div>

                
            </div>
            <div id="reservationBtn">
                <button type="submit" onClick={()=>{ alert("예약신청이 완료되었습니다.") }}>예약하기</button>
            </div>
        </form>
        </>
    );
}

export default ReservationConfirm;