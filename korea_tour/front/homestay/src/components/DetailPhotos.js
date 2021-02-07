import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HouseDetailCss/DetailPhotos.css';

function DetailPhotos(props) {
    const [content, setContent] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);

    let linkurl = document.location.href;
    let courseNum = linkurl.split('=')[1];

    useEffect( () => {
        const getPhotos = async () => {
            try {
                setContent(null);
                setError(null);
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:9003/homestays/${courseNum}/photos`
                );
                setContent(response.data.photo);
            } catch(e) {
                setError(e);
            }
            setLoading(false);
        };
        getPhotos();
    }, []);

    if (loading) return <p>로딩중....</p>;
    if (error) return <p>에러가 발생했습니다.!!</p>;
    if (!content) return null;
    
     console.log(content[0].photoName);

    return (
        <>
            <div id="photosMainBox">
                <div id="photoLeftBox"><img src={content[0].photoName} width="100%" /></div>

                <div id="photoRightBox">
                    <div id="photoRightBox-left">
                        <div className="photo-mini-Box"><img src={content[0].photoName} width="100%" /></div>
                        <div className="photo-mini-Box"><img src={content[0].photoName} width="100%" /></div>
                    </div>

                    <div id="photoRightBox-right">
                        <div className="photo-mini-Box"><img src={content[0].photoName} width="100%" /></div>
                        <div className="photo-mini-Box"><img src={content[0].photoName} width="100%" /></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailPhotos;