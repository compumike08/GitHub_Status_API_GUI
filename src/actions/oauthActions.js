import * as types from './actionTypes';

export function oauthTempCodeReceived(tempCode) {
    return {type: types.OAUTH_TEMP_CODE_RECEIVED, tempCode};
}

export function oauthTokenReceived(token) {
  return {type: types.OAUTH_TOKEN_RECEIVED, token};
}

export function oauthTokenDestroyed() {
  return {type: types.OAUTH_TOKEN_DESTROYED};
}

export function storeOAuthTempCode(tempCode) {
  return function (dispatch){
    dispatch(oauthTempCodeReceived(tempCode));
  };
}

export function storeOAuthToken(token) {
  return function (dispatch){
    dispatch(oauthTokenReceived(token));
  };
}

export function destroyOAuthToken() {
  return function (dispatch){
    dispatch(oauthTokenDestroyed());
  };
}
