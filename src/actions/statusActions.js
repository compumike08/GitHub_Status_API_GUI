import * as types from './actionTypes';
import GithubAPI from '../api/githubAPI';
import * as utilityMethods from '../utils/utilityMethods';

export function combinedStatusLoadedForBranch(repoId, branchName, combinedStatus) {
    return {type: types.COMBINED_STATUS_LOADED_FOR_BRANCH, repoId, branchName, combinedStatus};
}

export function loadCombinedStatusForBranch(repoId, branchName) {
  return function (dispatch, getState){
    const currentState = getState();
    const repos = currentState.repos;
    const repo = utilityMethods.getRepoById(repos, repoId);

    let repoName = repo.name;
    let ownerLogin = repo.owner.login;

    return GithubAPI.getCombinedStatusForRef(ownerLogin, repoName, branchName).then(combinedStatus => {
      dispatch(combinedStatusLoadedForBranch(repoId, branchName, combinedStatus));
    }).catch(error => {
      //TODO: Improve error handling instead of re-throwing error
      throw(error);
    });
  };
}
