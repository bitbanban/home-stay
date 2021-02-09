import {
  CHANGE_AREA,
  CHANGE_CHECKIN,
  CHANGE_CHECKOUT,
  CHANGE_COUNT,
} from '_actions/types';

const initialState = {
  area: "",
  checkin: '',
  checkout: '',
  count: 0,
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
  case CHANGE_AREA:
    console.log(action);
    return{...state,"area":action.area}
  case CHANGE_CHECKIN:
      return{...state,"checkin":action.checkin} 
  case CHANGE_CHECKOUT:
      return{...state,checkout:action.checkout} 
  case CHANGE_COUNT:
      return{...state,count:action.count}
 
    default:
      return state;
  }
}
