import React from 'react';
import { Button, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import axios from 'axios';

export default function FormHouseIntro(props) {
  const [houseIntro, setHouseIntro] = props.intro;
  const handleChange = e => {
    setHouseIntro({ ...houseIntro, [e.target.name]: e.target.value });
  };
  const uploadImage = e => {
    const uploadFile = e.target.files;
    const imageFile = new FormData();
    if (uploadFile.length < 5) {
      alert('5장이상의 사진을 올려주세요!');
      e.target.value = '';
    }

    for (const upload of uploadFile) {
      imageFile.append('images', upload);
    }
    props.setImageFile(imageFile);
  };
  return (
    <div>
      <TextField
        label="집 이름"
        margin="normal"
        value={houseIntro.title}
        name="title"
        onChange={handleChange}
      />
      <TextField
        label="설명 해주세요!"
        margin="normal"
        value={houseIntro.content}
        name="content"
        onChange={handleChange}
      />
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        onChange={uploadImage}
        style={{ display: 'none' }}
        multiple
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
}
