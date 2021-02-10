import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormHostInfo from 'components/hostform/FormHostInfo';
import FormHouseRules from 'components/hostform/FormHouseRules';
import FormHouseIntroModify from 'components/hostform/FormHouseIntroModify';
import FormConfirm from 'components/hostform/FormConfirm';
import ModifySubmit from 'components/hostform/ModifySubmit';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { URL } from '_utils/api';
import store from '_store/Store';

export default function HostManageHouse() {
  const num = store.getState().userReducer.num;
  const [loading, setLoading] = useState(true);
  const [approval, setApprovl] = useState(false);
  const [deletePhotos, setDeletePhotos] = useState([]);
  const [hostInfo, setHostInfo] = useState({
    addr1: '',
    addr2: '',
    email1: '',
    email2: '',
    hp: '',
  });
  const [houseRules, setHouseRules] = useState({
    checkIn1: '',
    checkIn2: '',
    checkOut1: '',
    checkOut2: '',
    maxPeople: '',
    price: '',
  });
  const [amenities, setAmenities] = useState({
    dogOk: false,
    wifi: false,
    smokingOk: false,
    bathroom: false,
    parking: false,
    towel: false,
    breakfast: false,
    aircon: false,
    elecProduct: false,
    kitchen: false,
  });
  const [houseIntro, setHouseIntro] = useState({
    title: '',
    content: '',
    photo: '',
  });
  const [imageFile, setImageFile] = useState('');
  const [photos, setPhotos] = useState();
  const [step, setStep] = useState(0);
  useEffect(() => {
    // async를 사용하는 함수 따로 선언
    const fatchData = async num => {
      setLoading(true);
      try {
        const response = await axios.get(`${URL}/house/${num}`);
        const data = response.data.dto;
        console.log(data);
        setHostInfo({
          addr1: data.addr1,
          addr2: data.addr2,
          email1: data.email1,
          email2: data.email2,
          hp: data.hp,
        });
        setHouseRules({
          checkIn1: data.checkIn1,
          checkIn2: data.checkIn2,
          checkOut1: data.checkOut1,
          checkOut2: data.checkOut2,
          maxPeople: data.maxPeople,
          price: data.price,
        });
        setAmenities({
          dogOk: data.dogOk == 1 ? true : false,
          wifi: data.wifi == 1 ? true : false,
          smokingOk: data.smokingOk == 1 ? true : false,
          bathroom: data.bathroom == 1 ? true : false,
          parking: data.parking == 1 ? true : false,
          towel: data.towel == 1 ? true : false,
          breakfast: data.breakfast == 1 ? true : false,
          aircon: data.aircon == 1 ? true : false,
          elecProduct: data.elecProduct == 1 ? true : false,
          kitchen: data.kitchen == 1 ? true : false,
        });
        setHouseIntro({
          title: data.title,
          content: data.content,
        });
        setApprovl(data.appoval);
        console.log(response.data.dto);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fatchData(num);
  }, []);

  //사진 가져오기
  useEffect(() => {
    const getPhoto = async num => {
      setLoading(true);
      try {
        const response = await axios.get(`${URL}/photo/${num}`);
        const data = response.data.list;
        console.log(data);
        setPhotos(data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    getPhoto(num);
  }, []);

  if (loading) {
    return <p>대기중....</p>;
  }

  function getSteps() {
    return [
      '호스트정보',
      '숙소정보',
      '홈스테이소개',
      '입력내용확인',
      '신청완료',
    ];
  }
  function showStep(step) {
    switch (step) {
      case 0:
        return <FormHostInfo info={[hostInfo, setHostInfo]} />;
      case 1:
        return (
          <FormHouseRules
            rules={[houseRules, setHouseRules]}
            amenity={[amenities, setAmenities]}
          />
        );
      case 2:
        return (
          <FormHouseIntroModify
            intro={[houseIntro, setHouseIntro]}
            setImageFile={setImageFile}
            photos={photos}
            delete={[deletePhotos, setDeletePhotos]}
          />
        );
      case 3:
        return (
          <FormConfirm
            info={hostInfo}
            rules={houseRules}
            amenity={[amenities, setAmenities]}
            intro={houseIntro}
          />
        );
      case 4:
        return (
          <ModifySubmit
            info={hostInfo}
            rules={houseRules}
            amenity={amenities}
            intro={houseIntro}
            image={imageFile}
            deletePhotos={deletePhotos}
          />
        );
    }
  }

  const steps = getSteps();

  const handleNext = () => {
    setStep(step => step + 1);
  };

  const handleBack = () => {
    setStep(step => step - 1);
  };

  const handleReset = () => {
    setStep(0);
  };

  return (
    <>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {approval == '0' && <span>승인대기중입니다</span>}
      {approval == '1' && (
        <span>호스트 신청이 반려되었습니다. 다시 신청해주세요</span>
      )}
      {approval == '2' && (
        <span>정보수정후 승인 대기기간동안은 예약을 받을 수 없습니다.</span>
      )}
      <div>{showStep(step)}</div>
      <div>
        {step === steps.length ? (
          <div>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <div>
              <Button disabled={step === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {step === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
