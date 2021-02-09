import { combineReducers } from 'redux';
import userReducer from '_reducers/userReducer';
import searchReducer from '_reducers/searchReducer';

const rootReducer = combineReducers({
  userReducer,
  searchReducer,
});

export default rootReducer;
