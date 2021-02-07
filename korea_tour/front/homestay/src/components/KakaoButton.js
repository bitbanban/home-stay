import React from 'react';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
const token = 'ef2b91ef7608dc08c402b6c4764534cd';

export default function KakaoButton(props) {
  const sendApi = async res => {
    const id = res.profile.id;
    const name = res.profile.properties.nickname;
    const avatar = res.profile.properties.profile_image;
    const type = 'kakao';
    const data = {
      name: name,
      id: id,
      type: type,
      img: avatar,
    };

    console.log(data);
    try {
      const response = await await axios.post(
        `http://localhost:9003/homestays/signin/`,
        data
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
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
