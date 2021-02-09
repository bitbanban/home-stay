import React from 'react';
import { Link } from 'react-router-dom';

import "components/Mypage.css";

const Mypage  =()=> {
    
        return (
           <div className="mypage">
           
           <h1>마이페이지 출력란</h1>
           <hr/>
           <div className="mypage-btn">
           <Link to="/homestay/mypage/Reservation">
           <button className="click-btn">예약 내역</button>
           </Link>
           <Link to="/homestay/mypage/likeList">
           <button className="click-btn">내가 찜한 홈스테이</button>
           </Link>
           <Link to="/homestay/mypage/reviewlist">
           <button className="click-btn">리뷰쓰기</button>
           </Link>
           <Link to="/homestay/mypage/reviewlist">
           <button className="click-btn">내가 쓴 리뷰</button>
           </Link>
           </div>
           </div>
        );
    
}
export default Mypage;