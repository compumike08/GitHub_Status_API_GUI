// Set up your root reducer here...
import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import oauthReturnedTempCode from './oauthReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  oauthReturnedTempCode: oauthReturnedTempCode
});

export default rootReducer;
