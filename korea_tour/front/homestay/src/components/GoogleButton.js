import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { signIn } from '_actions/user';

const clientId =
  '779685065070-lbrojg14lasf8j3g0gcapnctskou7pct.apps.googleusercontent.com';
let data;
function GoogleButton({ signIn }) {
  const sendApi = async res => {
    const name = res.profileObj.name;
    const avatar = res.profileObj.imageUrl;
    const id = res.googleId;
    const type = 'GOOGLE';
    return (data = {
      name: name,
      id: id,
      type: type,
      img: avatar,
    });
  };

  const onFailure = error => {
    console.log(error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={res => sendApi(res).then(signIn)}
      onFailure={onFailure}
    />
  );
}

export default connect(null, dispatch => ({
  signIn: () => dispatch(signIn(data)),
}))(GoogleButton);
