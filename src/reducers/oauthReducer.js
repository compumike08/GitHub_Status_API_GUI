import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function oauthReducer(state = initialState.oauthReturnedTempCode, action) {
  switch (action.type) {
    case types.OAUTH_TEMP_CODE_RECEIVED:
      console.log("IN REDUCER");
      return action.tempCode;
    default:
      console.log("DEFAULT REDUCER");
      return state;
  }
}
