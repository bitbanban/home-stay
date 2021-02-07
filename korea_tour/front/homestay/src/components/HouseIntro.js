import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HouseIntro(props) {

    const [content, setContent] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);

    let linkurl = document.location.href;
    let houseNum = linkurl.split('=')[1];

    useEffect( () => {
        const getIntro = async () => {
            try {
                setContent(null);
                setError(null);
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:9003/homestays/${houseNum}/content`
                );
                setContent(response.data);
            } catch(e) {
                setError(e);
            }
            setLoading(false);
        };
        getIntro();
    }, []);

    if (loading) return <p>로딩중....</p>;
    if (error) return <p>에러가 발생했습니다.!!</p>;
    if (!content) return null;


    return (
        <div>
            <h1>House 소개글</h1>
            <div id="HouseIntro_content">{content.content}</div>
                <hr/>
                <br/>
        </div>
    );
}

export default HouseIntro;