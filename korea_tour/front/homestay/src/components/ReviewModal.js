import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HouseDetailCss/Review.css';
import './HouseDetailCss/ReviewList.css';
import ReviewPhotos from './ReviewPhotos';
import { URL } from '_utils/api';


function ReviewModal(props) {
    const [content, setContent] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);

    let linkurl = document.location.href;
    let houseNum = linkurl.split('=')[1];

    useEffect( () => {
        const getReviews = async () => {
            try {
                setContent(null);
                setError(null);
                setLoading(true);
                const response = await axios.get(
                    `${URL}/${houseNum}/allreview`
                );
                setContent(response.data.reviews);
            } catch(e) {
                setError(e);
            }
            setLoading(false);
        };
        getReviews();
    }, []);

    if (loading) return <p>로딩중....</p>;
    if (error) return <p>에러가 발생했습니다.!!</p>;
    if (!content) return null;

    console.log(content);
   

    return (
        <>
        <div id="reviewModal__box">
            {
                content.map((i)=>{
                    return (
                       
                        <div key={i.homeStayReviewNum} className="modal__review-box">
                            <div className="review-writer-box">
                                <div className="profile-box">
                                    <div className="profile-img"><img src={i.loginPhoto}/></div>
                                    <div className="writer-writeday">
                                        <p><b>{i.loginId}</b></p>
                                        <p>{i.writeday}</p>
                                        <p>{i.relevel}</p>
                                    </div>
                                </div>

                                <div className="room-img"><ReviewPhotos reviewNum={i.homeStayReviewNum}/></div> 
                            </div>
                            
                            <div className="review-text-box">
                                {i.content} 
                            </div>
                        </div>
                        
                    )
                })
            }
        </div>
        
        </>
    );
}

export default ReviewModal;