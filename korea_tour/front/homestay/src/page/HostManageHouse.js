import React from 'react';
import store from '_store/Store';
function HostManageHouse(props) {
  const num = store.getState().userReducer.num;
  return <div>집수정</div>;
}

export default HostManageHouse;
