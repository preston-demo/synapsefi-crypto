import { combineReducers } from 'redux';
import browserReducer from './modules/browserReducer';
import userReducer from './modules/userReducer';
import cryptoReducer from './modules/cryptoReducer';

export default combineReducers({
  browser: browserReducer,
  user: userReducer,
  crypto: cryptoReducer
})