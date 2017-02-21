import * as types from './actionTypes';
import GithubAPI from '../api/githubAPI';
import GatekeeperApi from '../api/gatekeeperAPI';

export function oauthTokenReceived(token) {
  return {type: types.OAUTH_TOKEN_RECEIVED, token};
}

export function oauthTokenDestroyed() {
  return {type: types.OAUTH_TOKEN_DESTROYED};
}

export function oauthAuthUserLoaded(user) {
  return {type: types.OAUTH_AUTH_USER_LOADED, user};
}


export function exchangeCodeForToken(oauthTempCode){
  return function(dispatch){
    return GatekeeperApi.exchangeCodeForToken(oauthTempCode).then(result => {
      dispatch(oauthTokenReceived(result));
    }).catch(error => {
      //TODO: Improve error handling instead of just rethrowing error.
      console.log(error);
      throw(error);
    });
  };
}

export function destroyOAuthToken() {
  return function (dispatch){
    return GithubAPI.removeTokenFromGhApi().then(() => {
      dispatch(oauthTokenDestroyed());
    }).catch(error => {
      //TODO: Improve error handling instead of re-throwing error
      throw(error);
    });
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
