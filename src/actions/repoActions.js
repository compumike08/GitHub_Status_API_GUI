import * as types from './actionTypes';
import GithubAPI from '../api/githubAPI';

export function reposLoaded(repos){
  return {type: types.REPOS_LOADED, repos};
}

export function loadRepos(){
  return function(dispatch, getState) {
    const currentState = getState();

    return GithubAPI.getUserOwnedRepos(currentState.oauths.authenticatedUser.login).then(repos => {
      dispatch(reposLoaded(repos));
    }).catch(error => {
      throw(error);
    });

  };
}
