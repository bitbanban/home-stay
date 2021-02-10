import React, { useState, useEffect } from 'react';
import { URL } from '_utils/api';
import axios from 'axios';
import store from '_store/Store';

function ModifySubmit(props) {
  const deletePhotos = props.deletePhotos;
  console.log(deletePhotos);
  const num = store.getState().userReducer.num;
  const hostInfo = props.info;
  const houseIntro = props.intro;
  const amenities = props.amenity;
  const houseRules = props.rules;
  const photonum = 0;
  const [contents, setContents] = useState(null);
  const [loading, setLoading] = useState(false);
  const data = {
    userNum: num,
    addr1: hostInfo.addr1,
    addr2: hostInfo.addr2,
    email1: hostInfo.email1,
    email2: hostInfo.email2,
    hp: hostInfo.hp,
    checkIn1: houseRules.checkIn1,
    checkIn2: houseRules.checkIn2,
    checkOut1: houseRules.checkOut1,
    checkOut2: houseRules.checkIn2,
    maxPeople: houseRules.maxPeople,
    price: houseRules.price,
    dogOk: amenities.dogOk ? 1 : 0,
    wifi: amenities.wifi ? 1 : 0,
    smokingOk: amenities.smokingOk ? 1 : 0,
    bathroom: amenities.bathroom ? 1 : 0,
    parking: amenities.parking ? 1 : 0,
    towel: amenities.towel ? 1 : 0,
    breakfast: amenities.breakfast ? 1 : 0,
    aircon: amenities.aircon ? 1 : 0,
    elecProduct: amenities.elecProduct ? 1 : 0,
    kitchen: amenities.kitchen ? 1 : 0,
    title: houseIntro.title,
    content: houseIntro.content,
    photo: houseIntro.photo,
  };
  const imageFile = props.image;
  useEffect(() => {
    // async를 사용하는 함수 따로 선언
    const sendData = async num => {
      setLoading(true);
      try {
        const response = await axios
          .put(`${URL}/house/${num}`, data)
          .then(() => {
            alert('완료!');
          });
        console.log(data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    sendData(num);
  }, []);

  // 사진업로드
  useEffect(() => {
    // async를 사용하는 함수 따로 선언
    const sendPhoto = async num => {
      let url = `${URL}/photo/${parseInt(num)}`;
      setLoading(true);
      try {
        const response = await axios.post(url, imageFile).then(() => {
          alert('완료!');
        });
        console.log(data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    sendPhoto(num);
  }, []);

  //사진삭제
  useEffect(() => {
    for (const photonum of deletePhotos) {
      const deletePhoto = async photonum => {
        let url = `${URL}/photo/${photonum}`;
        setLoading(true);
        try {
          const response = await axios.delete(url).then(() => {
            alert('완료!');
          });
          console.log(data);
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
      };
      deletePhoto(photonum);
    }
  }, []);

  if (loading) {
    return <p>대기중....</p>;
  }

  return <div></div>;
}

export default ModifySubmit;
