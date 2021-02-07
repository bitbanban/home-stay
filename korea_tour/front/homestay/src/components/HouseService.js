import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocalParking from '@material-ui/icons/LocalParking'; //주차
import OfflineBolt from '@material-ui/icons/OfflineBolt'; //가전제품
import Kitchen from '@material-ui/icons/Kitchen'; //주방이용
import EmojiFoodBeverage from '@material-ui/icons/EmojiFoodBeverage'; //조식제공
import AcUnit from '@material-ui/icons/AcUnit'; //에어컨
import Wc from '@material-ui/icons/Wc'; //개별화장실
import Bathtub from '@material-ui/icons/Bathtub'; //욕실용품
import Wifi from '@material-ui/icons/Wifi'; //와이파이
import PetsIcon from '@material-ui/icons/Pets'; //반려동물동반
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms'; //흡연
import SmokeFreeIcon from '@material-ui/icons/SmokeFree'; //금연

function HouseService(props) {

    const [content, setContent] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);

    let linkurl = document.location.href;
    let courseNum = linkurl.split('=')[1];

    useEffect( () => {
        const getIcon = async () => {
            try {
                setContent(null);
                setError(null);
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:9003/homestays/${courseNum}/facility`
                );
                setContent(response.data);
            } catch(e) {
                setError(e);
            }
            setLoading(false);
        };
        getIcon();
    }, []);

    if (loading) return <p>로딩중....</p>;
    if (error) return <p>에러가 발생했습니다.!!</p>;
    if (!content) return null;

    let dogOk = content.dogOk;
    let smokingOk = content.smokingOk;
    
    let wifi = content.wifi;
    let towel = content.towel;
    let breakfast = content.breakfast;
    let aircon = content.aircon;
    let elecProduct = content.elecProduct;
    let kitchen = content.kitchen;
    let bathroom = content.bathroom;
    let parking = content.parking;

    return (
        <div>
            <h1>편의시설</h1>
                <div id="InfoIcon">
                    {
                        parking===1?
                        <p><span><LocalParking color="error" /></span>주차가능</p>
                        :<p><span><LocalParking /></span>주차불가</p>
                    }
                    {
                        elecProduct===1?
                        <p><span><OfflineBolt color="error" /></span>가전제품</p>
                        :<p><span><OfflineBolt /></span>이용불가</p>
                    }
                    {
                        kitchen===1?
                        <p><span><Kitchen color="error"/></span>주방이용</p>
                        :<p><span><Kitchen /></span>주방이용불가</p>
                    }
                    {
                        breakfast===1?
                        <p><span><EmojiFoodBeverage color="error"/></span>조식 제공</p>
                        :<p><span><EmojiFoodBeverage /></span>조식 미제공</p>
                    }
                    {
                        aircon===1?
                        <p><span><AcUnit color="error"/></span>에어컨</p>
                        :<p><span><AcUnit /></span>에어컨 미설치</p>
                    }
                    {
                        bathroom===1?
                        <p><span><Wc color="error"/></span>개별화장실</p>
                        :<p><span><Wc /></span>공용화장실</p>
                    }
                    {
                        towel===1?
                        <p><span><Bathtub color="error"/></span>욕실용품</p>
                        :<p><span><Bathtub /></span>공용화장실</p>
                    }
                    {
                        wifi===1?
                        <p><span><Wifi color="error"/></span>와이파이</p>
                        :<p><span><Wifi /></span>와이파이 없음</p>
                    }
                    {
                        dogOk===1?
                        <p><span><PetsIcon color="error"/></span>반려동물 동반 가능</p>
                        :<p><span><PetsIcon /></span>반려동물 동반 불가능</p>
                    }
                    {
                        smokingOk===1?
                        <p><span><SmokingRoomsIcon color="error"/></span>흡연시설</p>
                        :<p><span><SmokeFreeIcon /></span>금연시설</p>
                    }
                    
                    
                    
                </div>
        </div>
    );
}

export default HouseService;