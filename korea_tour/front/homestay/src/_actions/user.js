import axios from 'axios';
import { SIGN_IN, SIGN_OUT } from './types';

export function signIn(APIdata) {
  let url = `http://localhost:9003/homestays/signin/`;
  return function (dispatch) {
    axios
      .post(url, APIdata)
      .then(response => {
        const userData = response.data;

        return dispatch({
          type: SIGN_IN,
          APIdata,
          userData,
        });
      })
      .catch(response =>
        dispatch({
          type: SIGN_IN,
          error: response.error,
        })
      );
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}
