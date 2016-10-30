import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function oauthReducer(state = initialState.oauths, action) {
  switch (action.type) {
    case types.OAUTH_TEMP_CODE_RECEIVED:
      return {
        oauthReturnedTempCode: action.tempCode,
        oauthReturnedToken: state.oauthReturnedToken,
        authenticatedUser: {}
      };
    case types.OAUTH_TOKEN_RECEIVED:
      return {
        oauthReturnedTempCode: state.oauthReturnedTempCode,
        oauthReturnedToken: action.token,
        authenticatedUser: {}
      };
    case types.OAUTH_TOKEN_DESTROYED:
      return {
        oauthReturnedTempCode: "",
        oauthReturnedToken: "",
        authenticatedUser: {}
      };
    case types.OAUTH_AUTH_USER_LOADED:
      return {
        oauthReturnedTempCode: state.oauthReturnedTempCode,
        oauthReturnedToken: state.oauthReturnedToken,
        authenticatedUser: action.user
      };
    default:
      return state;
  }
}
