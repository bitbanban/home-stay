import React from 'react';
import KakaoLogin from 'react-kakao-login';
const token = 'ef2b91ef7608dc08c402b6c4764534cd';

export default function KakaoButton(props) {
  const { onLoginKakao } = props;
  const sendApi = res => {
    const id = res.profile.id;
    const name = res.profile.properties.nickname;
    const avatar = res.profile.properties.profile_image;

    console.log(res);
  };
  return (
    <KakaoLogin
      token={token}
      onSuccess={res => sendApi(res)}
      onFail={() => {
        alert('로그인에 실패했습니다');
      }}
      onLogout={console.info}
      useLoginForm
    />
  );
}
