import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HouseDetailCss/Carousel.css';

function HouseCarousel(props) {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        className:"carousel11"
      };

    const [content, setContent] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);


    let linkurl = document.location.href;
    let courseNum = linkurl.split('=')[1];

    useEffect( () => {
        const getModalPhotos = async () => {
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
        getModalPhotos();
    }, []);

    if (loading) return <p>로딩중....</p>;
    if (error) return <p>에러가 발생했습니다.!!</p>;
    if (!content) return null;


    return (
        <div>
            <Slider {...settings}>
            {
                content.map((i)=>{  
                    return ( <div className="modal-imgbox">
                    <img src={"http://localhost:9003/homeStayImg/"+i.photoName} className="carousel-img" />
                    </div>
                    )
                })
            }
            </Slider>
            
        </div>
    );
}

export default HouseCarousel;