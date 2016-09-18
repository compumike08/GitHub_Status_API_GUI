// Set up your root reducer here...
import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import oauths from './oauthReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  oauths: oauths
});

export default rootReducer;
