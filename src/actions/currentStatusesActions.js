import * as types from './actionTypes';
import GithubAPI from '../api/githubAPI';
import * as utilityMethods from '../utils/utilityMethods';

export function statusesLoadedForCurrentCommit(repoId, isFromBranch, branchName, commit, statuses) {
  return {type: types.STATUSES_LOADED_FOR_CURRENT_COMMIT, repoId, isFromBranch, branchName, commit, statuses};
}

export function loadStatusesForCurrentCommit(repoId, isFromBranch, branchName, commitSha) {
  return function (dispatch, getState) {
    //TODO: Refactor the code below (not including the 'return' statement where the API is called) out to a common function within utilityMethods
    const currentState = getState();
    const repos = currentState.repos;
    const repo = utilityMethods.getRepoById(repos, repoId);

    let repoName = repo.name;
    let ownerLogin = repo.owner.login;

    return GithubAPI.getStatusesForCommit(ownerLogin, repoName, commitSha).then(statuses => {
      dispatch(statusesLoadedForCurrentCommit(repoId, isFromBranch, branchName, commitSha, statuses));
    }).catch(error => {
      //TODO: Improve error handling instead of re-throwing error
      throw(error);
    });

  };
}
