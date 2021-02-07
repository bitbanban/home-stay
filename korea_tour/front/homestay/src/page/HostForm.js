import React, { useState } from 'react';
import FormHostInfo from 'components/hostform/FormHostInfo';
import FormHouseRules from 'components/hostform/FormHouseRules';
import FormHouseIntro from 'components/hostform/FormHouseIntro';
import FormConfirm from 'components/hostform/FormConfirm';
import FormSubmit from 'components/hostform/FormSubmit';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';

export default function HostForm() {
  const [step, setStep] = useState(0);
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
          <FormHouseIntro
            intro={[houseIntro, setHouseIntro]}
            setImageFile={setImageFile}
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
          <FormSubmit
            info={hostInfo}
            rules={houseRules}
            amenity={amenities}
            intro={houseIntro}
            image={imageFile}
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
