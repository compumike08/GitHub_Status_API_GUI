// Set up your root reducer here...
import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import oauths from './oauthReducer';
import repos from './repoReducer';
import combinedStatusData from './combinedStatusReducer';
import currentCommitStatusesData from './currentStatusesReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  oauths: oauths,
  repos: repos,
  combinedStatusData: combinedStatusData,
  currentCommitStatusesData: currentCommitStatusesData
});

export default rootReducer;
