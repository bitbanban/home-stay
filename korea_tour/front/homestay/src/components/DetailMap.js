import React, { useEffect, useState } from 'react';
import './HouseDetailCss/DetailMap.css';
import axios from 'axios';
import { URL } from '_utils/api';

const { kakao } = window;

const DetailMap = () => {


    let linkurl = document.location.href;
    let houseNum = linkurl.split('=')[1];

    const [content, setContent] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error, setError] = useState(null);

    
  

    
  useEffect(() => {
    
    const getAddr = async () => {
      try {
          setContent(null);
          setError(null);
          setLoading(true);
          const response = await axios.get(
              `${URL}/${houseNum}/addr`
          );
          setContent(response.data.addr1);
          console.log(response.data);
          
      } catch(e) {
          setError(e);
      }
      setLoading(false);
  };
  getAddr();
  
  
  
  
  }, []);


  useEffect(() => {
    
    function createMap(){
      const container = document.getElementById('myMap');
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      
      const map = new kakao.maps.Map(container, options);
  
      // 주소-좌표 변환 객체를 생성합니다
      const geocoder = new kakao.maps.services.Geocoder();
  
      // 주소로 좌표를 검색합니다
      
      geocoder.addressSearch( content, addSearchCB);
      
  
      function addSearchCB(result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
  

          var imageSrc = 'http://localhost:9003/homeStayImg/location-pin.png', // 마커이미지의 주소입니다    
              imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
              imageOption = {offset: new kakao.maps.Point(35, 40)};

          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
            image: markerImage
        });
          
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
        const circle = new kakao.maps.Circle({
          center: coords, // 원의 중심좌표 입니다
          radius: 250, // 미터 단위의 원의 반지름입니다
          strokeWeight: 5, // 선의 두께입니다
          strokeColor: 'ddd', // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid', // 선의 스타일 입니다
          fillColor: '#3e3e3e', // 채우기 색깔입니다
          fillOpacity: 0.7, // 채우기 불투명도 입니다
        });
        circle.setMap(map);
        
      }
    }
  
    createMap();
  
  
  }, [content]);
  
  


  console.log(content);
  
  return (
    <>
    <div id="myMap"></div>
    <div id="second"></div>
    
    </>
  );
};

export default DetailMap;