import React from 'react';
import KakaoLogin from 'react-kakao-login';
import { connect } from 'react-redux';
import { signIn } from '_actions/user';

const token = 'ef2b91ef7608dc08c402b6c4764534cd';
let data;
const KakaoButton = ({ signIn }) => {
  const sendApi = async res => {
    const id = res.profile.id;
    const nickname = res.profile.properties.nickname;
    const img = res.profile.properties.profile_image;
    const type = 'KAKAO';
    return (data = {
      name: nickname,
      id: id,
      type: type,
      img: img,
    });
  };

  return (
    <KakaoLogin
      token={token}
      onSuccess={res => sendApi(res).then(signIn)}
      onFail={() => {
        alert('로그인에 실패했습니다');
      }}
      onLogout={console.info}
      useLoginForm
    />
  );
};

export default connect(null, dispatch => ({
  signIn: () => dispatch(signIn(data)),
}))(KakaoButton);
