// Set up your root reducer here...
import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import oauths from './oauthReducer';
import repos from './repoReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  oauths: oauths,
  repos: repos
});

export default rootReducer;
