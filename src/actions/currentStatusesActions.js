import * as types from './actionTypes';
import GithubAPI from '../api/githubAPI';
import * as utilityMethods from '../utils/utilityMethods';

export function statusesLoadedForCurrentCommit(repoId, isFromBranch, branchName, commit, statuses) {
  return {type: types.STATUSES_LOADED_FOR_CURRENT_COMMIT, repoId, isFromBranch, branchName, commit, statuses};
}

export function loadStatusesForCurrentCommit(repoId, isFromBranch, branchName, commitSha) {
  return function (dispatch, getState) {
    const currentState = getState();
    const repo = utilityMethods.getRepoById(currentState.repos, repoId);

    return GithubAPI.getStatusesForCommit(repo.owner.login, repo.name, commitSha).then(statuses => {
      dispatch(statusesLoadedForCurrentCommit(repoId, isFromBranch, branchName, commitSha, statuses));
    }).catch(error => {
      //TODO: Improve error handling instead of re-throwing error
      throw(error);
    });

  };
}
