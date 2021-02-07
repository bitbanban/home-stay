import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
const clientId =
  '779685065070-lbrojg14lasf8j3g0gcapnctskou7pct.apps.googleusercontent.com';

export default function GoogleButton({ onSocial }) {
  const onSuccess = async res => {
    const name = res.profileObj.name;
    const avatar = res.profileObj.imageUrl;
    const id = res.googleId;
    const type = 'google';
    const data = {
      name: name,
      id: id,
      type: type,
      img: avatar,
    };
    try {
      const response = await axios.post(
        `http://localhost:9003/homestays/signin/`,
        data
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onFailure = error => {
    console.log(error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
}
