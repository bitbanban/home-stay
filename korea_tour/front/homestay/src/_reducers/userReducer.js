import { SIGN_IN, SIGN_OUT } from '_actions/types';

const initialState = {
  num: 0,
  avatar: '',
  name: '',
  host: 'N',
  auth: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      const userNum = action.userData.userNum;
      const host = action.userData.host;
      const avatar = action.APIdata.img;
      const name = action.APIdata.nickname;
      const auth = true;
      console.log(action);
      return {
        ...initialState,
        num: userNum,
        avatar: avatar,
        name: name,
        host: host,
        auth: auth,
      };
    case SIGN_OUT:
      return { ...initialState };

    default:
      return state;
  }
}
