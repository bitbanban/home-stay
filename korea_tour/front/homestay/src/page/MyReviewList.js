import React, { useEffect, useState } from 'react';
import axios from 'axios';

import store from '_store/Store';

import MyRow from "components/MyReviewRow";


const MyReviewList =()=>{
    const [reviewList,setReviewList] = useState(null);
    const [loading,setLoading] = useState(false);
    const [user,setUser] = useState({
        num: '',
    });

    store.subscribe(() => {
        setUser({
          num: store.getState().userReducer.num,
        });
      });
    
      let userNum=user.num;
      console.log(userNum);
    useEffect(() =>{
    // async를 사용하는 함수 따로 선언
    const fatchData = async ()=> {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:9003/homestays/mypage/reservations-for-review/${userNum}/1`
            );
            setReviewList(response.data.reservations);
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
    if (!reviewList) {
     return null;
    }
     // articles 값이 유효할때
        return (
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <p>내가 쓸 후기</p>

              
              {reviewList.map((reviewList,index)=>
                (<MyRow
                  checkIn ={reviewList.checkInDay}
                  checkOut ={reviewList.checkOutDay}
                  homeStayNum = {reviewList.homeStayNum}
                  title = {reviewList.homeStayTitle}
                  housePhoto ={reviewList.homeStayPhoto}
                  review ={reviewList.reviewWrite}
                  key={index}
                />) 
                 )}
            </div>
        )
}

export default MyReviewList;