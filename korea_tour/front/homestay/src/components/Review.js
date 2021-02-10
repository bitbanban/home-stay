import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HouseDetailCss/Review.css';
import ReviewPhotos from './ReviewPhotos';
import { URL } from '_utils/api';

function Review(props) {
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

    console.log(content[0].photoName);

    return (
        <>
        <div className="review-box">
            <div className="review-writer-box">
                <div className="profile-box">
                    <div className="profile-img"><img src={content[0].loginPhoto}/></div>
                    <div className="writer-writeday">
                        <p><b>{content[0].loginId}</b></p>
                        <p>{content[0].writeday}</p>
                    </div>
                </div>
                <div className="room-img"><ReviewPhotos reviewNum={content[0].homeStayReviewNum}/></div> 
            </div>
            <div className="review-text-box">
                {content[0].content} 
            </div>
        </div>


        <div className="review-box">
            <div className="review-writer-box">
                <div className="profile-box">
                    <div className="profile-img"><img src={content[0].loginPhoto}/></div>
                    <div className="writer-writeday">
                        <p><b>{content[1].loginId}</b></p>
                        <p>{content[1].writeday}</p>
                    </div>
                </div>
                <div className="room-img"><ReviewPhotos reviewNum={content[1].homeStayReviewNum}/></div>
            </div>
            <div className="review-text-box">
                {content[1].content} 
            </div>
        </div>


        <div className="review-box">
            <div className="review-writer-box">
                <div className="profile-box">
                    <div className="profile-img"><img src={content[2].loginPhoto}/></div>
                    <div className="writer-writeday">
                        <p><b>{content[2].loginId}</b></p>
                        <p>{content[2].writeday}</p>
                    </div>
                </div>
                <div className="room-img"><ReviewPhotos reviewNum={content[2].homeStayReviewNum}/></div>
            </div>
            <div className="review-text-box">
                {content[2].content} 
            </div>
        </div>


        <div className="review-box">
            <div className="review-writer-box">
                <div className="profile-box">
                    <div className="profile-img"><img src={content[3].loginPhoto}/></div>
                    <div className="writer-writeday">
                        <p><b>{content[3].loginId}</b></p>
                        <p>{content[3].writeday}</p>
                    </div>
                </div>
                <div className="room-img"><ReviewPhotos reviewNum={content[3].homeStayReviewNum}/></div>
            </div>
            <div className="review-text-box">
                {content[3].content} 
            </div>
        </div>


        <div className="review-box">
            <div className="review-writer-box">
                <div className="profile-box">
                    <div className="profile-img"><img src={content[4].loginPhoto}/></div>
                    <div className="writer-writeday">
                        <p><b>{content[4].loginId}</b></p>
                        <p>{content[4].writeday}</p>
                    </div>
                </div>
                <div className="room-img"><ReviewPhotos reviewNum={content[4].homeStayReviewNum}/></div>
            </div>
            <div className="review-text-box">
                {content[4].content} 
            </div>
        </div>


        <div className="review-box">
            <div className="review-writer-box">
                <div className="profile-box">
                    <div className="profile-img"><img src={content[5].loginPhoto}/></div>
                    <div className="writer-writeday">
                        <p><b>{content[5].loginId}</b></p>
                        <p>{content[5].writeday}</p>
                    </div>
                </div>
                <div className="room-img"><ReviewPhotos reviewNum={content[5].homeStayReviewNum}/></div>
            </div>
            <div className="review-text-box">
                {content[5].content} 
            </div>
        </div>
        </>
    );
}

export default Review;