import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function oauthReducer(state = initialState.oauths, action) {
  switch (action.type) {
    case types.OAUTH_TEMP_CODE_RECEIVED:
      console.log("IN REDUCER");
      return {
        oauthReturnedTempCode: action.tempCode,
        oauthReturnedToken: state.oauthReturnedToken
      };
    default:
      console.log("DEFAULT REDUCER");
      return state;
  }
}
