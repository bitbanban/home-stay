import React from 'react';
import NaverLogin from 'react-naver-login';
import axios from 'axios';

function NaverButton(props) {
  const sendUserInfo = async res => {
    const id = res.id;
    const name = res.name;
    const avatar = res.profile_image;
    const type = 'naver';
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
  return (
    <NaverLogin
      clientId="XsYIxoQxXx7dgXFoawSE"
      callbackUrl="http://127.0.0.1:3000"
      render={props => <div onClick={props.onClick}>Naver Login</div>}
      onSuccess={res => sendUserInfo(res)}
      onFailure={() => console.error()}
    />
  );
}

export default NaverButton;
