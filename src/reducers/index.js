// Set up your root reducer here...
import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import oauths from './oauthReducer';
import repos from './repoReducer';
import statuses from './statusReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  oauths: oauths,
  repos: repos,
  statuses: statuses
});

export default rootReducer;
