// Set up your root reducer here...
import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import oauths from './oauthReducer';
import repos from './repoReducer';
import combinedStatusData from './combinedStatusReducer';
import currentCommitStatusesData from './currentStatusesReducer';
import currentPaginationState from './paginationReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  oauths: oauths,
  repos: repos,
  combinedStatusData: combinedStatusData,
  currentCommitStatusesData: currentCommitStatusesData,
  currentPaginationState: currentPaginationState
});

export default rootReducer;
