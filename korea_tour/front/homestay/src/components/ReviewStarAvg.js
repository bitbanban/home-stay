import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReviewStarAvg(props) {
    const [content, setContent] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);

    let linkurl = document.location.href;
    let courseNum = linkurl.split('=')[1];

    useEffect( () => {
        const getStarAvg = async () => {
            try {
                setContent(null);
                setError(null);
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:9003/homestays/${courseNum}/staravg`
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
                <span>청결도</span><span>{content.cleanliness}</span>  
            </div>
            <div className="reviewPoint-box">
                <span>정확성</span><span>{content.accuracy}</span>  
            </div>
            <div className="reviewPoint-box">
                <span>의사소통</span><span>{content.communication}</span> 
            </div>
            <div className="reviewPoint-box">
                <span>위치</span><span>{content.location}</span> 
            </div>
            <div className="reviewPoint-box">
                <span>체크인</span><span>{content.checkIn}</span>
            </div>
            <div className="reviewPoint-box">
                <span>가격 대비 만족</span><span>{content.satisfactionForPrice}</span>
            </div>
        </div>
    );
}

export default ReviewStarAvg;