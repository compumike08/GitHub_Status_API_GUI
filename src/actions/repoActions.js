import * as types from './actionTypes';
import GithubAPI from '../api/githubAPI';

export function reposLoaded(repos){
  return {type: types.REPOS_LOADED, repos};
}

export function branchesLoadedForRepo(branches, repo){
  return {type: types.BRANCHES_LOADED_FOR_REPO, branches, repo};
}

export function loadRepos(){
  return function(dispatch, getState) {
    const currentState = getState();

    return GithubAPI.getUserOwnedRepos(currentState.oauths.authenticatedUser.login).then(repos => {
      dispatch(reposLoaded(repos));
    }).catch(error => {
      //TODO: Improve error handling instead of re-throwing error
      throw(error);
    });

  };
}

export function loadBranchesForRepo(repoName){
  return function(dispatch, getState) {
    const currentState = getState();

    let repo = currentState.repos.find(repo => repo.name == repoName);

    return GithubAPI.getBranchesInRepo(repo.owner.login, repo.name).then(branches => {
      dispatch(branchesLoadedForRepo(branches, repo));
    }).catch(error => {
      //TODO: Improve error handling instead of re-throwing error
      throw(error);
    });
  };
}
