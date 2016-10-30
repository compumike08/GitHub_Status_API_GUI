import * as types from './actionTypes';
import GithubAPI from '../api/githubAPI';

export function oauthTempCodeReceived(tempCode) {
    return {type: types.OAUTH_TEMP_CODE_RECEIVED, tempCode};
}

export function oauthTokenReceived(token) {
  return {type: types.OAUTH_TOKEN_RECEIVED, token};
}

export function oauthTokenDestroyed() {
  return {type: types.OAUTH_TOKEN_DESTROYED};
}

export function oauthAuthUserLoaded(user) {
  return {type: types.OAUTH_AUTH_USER_LOADED, user};
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

export function loadAuthenticatedUser() {
  return function (dispatch){
    return GithubAPI.getAuthenticatedUser().then(user => {
      dispatch(oauthAuthUserLoaded(user));
    }).catch(error => {
      //TODO: Improve error handling instead of re-throwing error
      throw(error);
    });
  };
}
