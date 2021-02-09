import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HouseDetailCss/DetailPhotos.css';
import HouseModal from './HouseModal';

function DetailPhotos(props) {
    const [content, setContent] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [modal, setModal] = useState(false);//모달창을 켜고 닫는 스위치

    let linkurl = document.location.href;
    let houseNum = linkurl.split('=')[1];

    useEffect( () => {
        const getPhotos = async () => {
            try {
                setContent(null);
                setError(null);
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:9003/homestays/${houseNum}/photos`
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
                <div id="photoLeftBox"><img src={"http://localhost:9003/homeStayImg/"+content[0].photoName} width="100%" height="100%"/></div>

                <div id="photoRightBox">
                    <div id="photoRightBox-left">
                        <div className="photo-mini-Box"><img src={"http://localhost:9003/homeStayImg/"+content[1].photoName} width="100%" height="100%"/></div>
                        <div className="photo-mini-Box"><img src={"http://localhost:9003/homeStayImg/"+content[2].photoName} width="100%" height="100%"/></div>
                    </div>

                    <div id="photoRightBox-right">
                        <div className="photo-mini-Box"><img src={"http://localhost:9003/homeStayImg/"+content[3].photoName} width="100%" height="100%"/></div>
                        
                        <div className="photo-mini-Box">
                            <div id="ModalBtn" onClick={ ()=>{ setModal(true) } } ><span>+</span></div> <img id="lastImage" src={"http://localhost:9003/homeStayImg/"+content[4].photoName} width="100%" height="100%" />
                        </div>
                    </div>
                </div>
            </div>

            {
                modal === true
                ? <HouseModal setModal={setModal}></HouseModal> 
                : null //텅빈 HTML이라는 뜻
            }

        </>
    );
}

export default DetailPhotos;