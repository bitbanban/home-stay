import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import { URL } from '_utils/api';

function ReviewStarAvg(props) {
    const [content, setContent] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);
    

    const [value, setValue] = React.useState(2);

    let linkurl = document.location.href;
    let houseNum = linkurl.split('=')[1];

    useEffect( () => {
        const getStarAvg = async () => {
            try {
                setContent(null);
                setError(null);
                setLoading(true);
                const response = await axios.get(
                    `${URL}/${houseNum}/staravg`
                );
                setContent(response.data);
            } catch(e) {
                setError(e);
            }
            setLoading(false);
        };
        getStarAvg();
    }, []);

    if (loading) return <p>로딩중....</p>;
    if (error) return <p>에러가 발생했습니다.!!</p>;
    if (!content) return null;

    return (
        <div id="reviewPoint">
            <div className="reviewPoint-box">
                <span className="star-title">청결도</span>
                <span className="star-point">
                    <span className="star-point__text">{content.cleanliness}</span><Rating name="read-only" value={content.cleanliness} readOnly />
                </span>
            </div>
            <div className="reviewPoint-box">
                <span className="star-title">정확성</span>
                <span className="star-point">
                    <span className="star-point__text">{content.accuracy}</span><Rating name="read-only" value={content.accuracy} readOnly />
                </span>  
            </div>
            <div className="reviewPoint-box">
                <span className="star-title">의사소통</span>
                <span className="star-point">
                    <span className="star-point__text">{content.communication}</span><Rating name="read-only" value={content.communication} readOnly />
                </span>   
            </div>
            <div className="reviewPoint-box">
                <span className="star-title">위치</span>
                <span className="star-point">
                    <span className="star-point__text">{content.location}</span> <Rating name="read-only" value={content.location} readOnly />
                </span>  
            </div>
            <div className="reviewPoint-box">
                <span className="star-title">체크인</span>
                <span className="star-point">
                    <span className="star-point__text">{content.checkIn}</span> <Rating name="read-only" value={content.checkIn} readOnly />
                </span> 
            </div>
            <div className="reviewPoint-box">
                <span className="star-title">가격 대비 만족</span>
                <span className="star-point">
                    <span className="star-point__text">{content.satisfactionForPrice}</span> <Rating name="read-only" value={content.satisfactionForPrice} readOnly />
                </span>
            </div>
        </div>
    );
}

export default ReviewStarAvg;