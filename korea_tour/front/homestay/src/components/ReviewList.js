import React, { useState, useEffect } from 'react';
import Review from './Review';
import './HouseDetailCss/ReviewList.css';
import StarIcon from '@material-ui/icons/Star';
import axios from 'axios';
import ReviewStarAvg from './ReviewStarAvg';
import Button from '@material-ui/core/Button';
import ReviewModal from './ReviewModal';


function ReviewList(props) {
    const [modal, setModal] = useState(false);

    const [content, setContent] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);

    

    let linkurl = document.location.href;
    let courseNum = linkurl.split('=')[1];

    useEffect( () => {
        const getStar = async () =>{
            try{
                setContent(null);
                setError(null);
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:9003/homestays/${courseNum}/star`
                    );
                    setContent(response.data);
                    console.log(response.data);
            } catch (e){
                setError(e);
            }
            setLoading(false);
        };
        getStar();
    }, []);

    if (loading) return <p>로딩중....</p>;
    if (error) return <p>에러가 발생했습니다.</p>;
    if (!content) return null;

    return (
        <div>
            <hr/>
            <br/>
            <h1>리뷰리스트</h1>
            <span id="star">
                <StarIcon color="error" /></span><span id="scoreText">{content.allOfAvg}(후기 {content.countOfReview}개)
            </span>

            <div id="reviewStarAvg">
                <ReviewStarAvg />
            </div>

            <div id="reviewList">
                <Review />
            </div>

            {
                modal === true
                ? <div className="answer-btn" onClick={ ()=>{ setModal(!modal) } }><Button variant="contained" >후기 창 닫기</Button></div>
                : <div className="answer-btn" onClick={ ()=>{ setModal(!modal) } }><Button variant="contained" >후기 모두보기</Button></div>
            }
            

            {
                modal === true
                ? <ReviewModal setModal={setModal} />
                : null
            }
            <br/>
            <hr/>
        </div>
        
    );
}

export default ReviewList;