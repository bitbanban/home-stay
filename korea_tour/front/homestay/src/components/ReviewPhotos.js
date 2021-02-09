import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReviewPhotos(props) {

    const [content, setContent] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);

    let linkurl = document.location.href;
    let houseNum = linkurl.split('=')[1];
    const reviewNum = props.reviewNum;
   
    useEffect( () => {
        const getReviews = async (reviewNum) => {
            try {
                setContent(null);
                setError(null);
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:9003/homestays/${houseNum}/allreview/${reviewNum}`
                );
                console.log(reviewNum)
                setContent(response.data.photos);
            } catch(e) {
                setError(e);
            }
            setLoading(false);
        };
        getReviews(reviewNum);
    }, []);

    if (loading) return <p>로딩중....</p>;
    if (error) return <p>에러가 발생했습니다.!!</p>;
    if (!content) return null;


    return (
        <div id="photoBox">
            {
                content.map((i)=>{
                    return (
                        <div key={i.photoNum}>{i.photoName}</div>
                    )
                })
            }
        </div>
    );
}

export default ReviewPhotos;