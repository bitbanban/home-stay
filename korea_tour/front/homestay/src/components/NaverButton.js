import React from 'react';
import NaverLogin from 'react-naver-login';
import { connect } from 'react-redux';
import { signIn } from '_actions/user';
let data;
function NaverButton({ signIn }) {
  const sendApi = async res => {
    const id = res.id;
    const name = res.name;
    const avatar = res.profile_image;
    const type = 'NAVER';
    return (data = {
      name: name,
      id: id,
      type: type,
      img: avatar,
    });
  };
  return (
    <NaverLogin
      clientId="XsYIxoQxXx7dgXFoawSE"
      callbackUrl="http://127.0.0.1:3000"
      render={props => <div onClick={props.onClick}>Naver Login</div>}
      onSuccess={res => sendApi(res).then(signIn)}
      onFailure={() => console.error()}
    />
  );
}
export default connect(null, dispatch => ({
  signIn: () => dispatch(signIn(data)),
}))(NaverButton);
