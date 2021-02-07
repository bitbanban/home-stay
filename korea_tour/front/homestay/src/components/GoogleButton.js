import React from 'react';
import GoogleLogin from 'react-google-login';

const clientId =
  '779685065070-lbrojg14lasf8j3g0gcapnctskou7pct.apps.googleusercontent.com';

export default function GoogleButton({ onSocial }) {
  const onSuccess = async res => {
    const name = res.profileObj.name;
    const avatar = res.profileObj.imageUrl;
    const id = res.googleId;
    console.log(res);
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
