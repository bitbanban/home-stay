import React from 'react';
import NaverLogin from 'react-naver-login';

function NaverButton(props) {
  const sendUserInfo = res => {
    const id = res.id;
    const name = res.name;
    const avatar = res.profile_image;
    console.log(thumbnail);
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
