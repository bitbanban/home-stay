import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { img } from '_utils/api';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function FormHouseIntro(props) {
  const classes = useStyles();
  const [houseIntro, setHouseIntro] = props.intro;
  const photos = props.photos;

  const [deletePhotos, setDeletePhotos] = props.delete;
  const deletePhoto = e => {
    const copied = Object.assign([], deletePhotos);
    const data = e.target.getAttribute('data');
    copied.push(data);
    setDeletePhotos(copied);
    e.target.remove();
    console.log(deletePhotos);
  };

  const handleChange = e => {
    setHouseIntro({ ...houseIntro, [e.target.name]: e.target.value });
  };
  const [previews, setPreviews] = useState([]);

  const uploadImage = e => {
    const uploadFile = e.target.files;
    let review = new Array(uploadFile.length);
    const imageFile = new FormData();
    if (props.delete) {
      if (photos.length - deletePhotos.length + uploadFile.length < 5) {
        alert('5장이상의 사진을 올려주세요!');
        e.target.value = '';
      }
    } else {
      if (uploadFile.length < 5) {
        alert('5장이상의 사진을 올려주세요!');
        e.target.value = '';
      }
    }

    props.setImageFile(imageFile);

    console.log(uploadFile);
    for (const upload of uploadFile) {
      imageFile.append('images', upload);
    }

    for (let i = 0; i < uploadFile.length; i++) {
      review[i] = uploadFile[i].name;
    }
    setPreviews({ ...previews, review });
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
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={2}
      >
        {/* 수정시 기존 사진 */}
        {photos && <span>기존 이미지를 클릭하면 삭제됩니다</span>}
        {photos &&
          photos.map(photo => (
            <Grid item xs={6} sm={4} md={4} key={photo.homeStayPhotoNum}>
              <Card className={classes.root} onClick={deletePhoto}>
                <CardMedia
                  className={classes.media}
                  image={img + '/' + photo.photoName}
                  data={photo.homeStayPhotoNum}
                />
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
