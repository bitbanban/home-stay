import React, { useState, useEffect } from 'react';
import StarIcon from '@material-ui/icons/Star';
import axios from 'axios';

function HouseStarAvg(props) {
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
            <span>
                <span id="star"><StarIcon color="error" /></span><span>{content.allOfAvg}(후기 {content.countOfReview}개)</span>
            </span>
        </div>
    );
}

export default HouseStarAvg;