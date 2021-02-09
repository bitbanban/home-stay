import { combineReducers } from 'redux';
import userReducer from '_reducers/userReducer';
const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
