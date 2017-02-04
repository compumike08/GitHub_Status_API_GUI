import * as types from './actionTypes';
import GithubAPI from '../api/githubAPI';
import * as utilityMethods from '../utils/utilityMethods';

export function statusesLoadedForCurrentCommit(repoId, isFromBranch, branchName, commitSha, statuses) {
  return {type: types.STATUSES_LOADED_FOR_CURRENT_COMMIT, repoId, isFromBranch, branchName, commitSha, statuses};
}

export function statusCreatedForCommit(newStatus) {
  return {type: types.STATUS_CREATED_FOR_COMMIT, newStatus};
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

export function createNewStatusForCommit(repoId, commitSha, state, description, targetUrl) {
  return function (dispatch, getState) {
    const currentState = getState();
    const repo = utilityMethods.getRepoById(currentState.repos, repoId);

    return GithubAPI.createStatusForCommit(repo.owner.login, repo.name, commitSha, state, description, targetUrl).then(newStatus => {
      dispatch(statusCreatedForCommit(newStatus));
    }).catch(error => {
      //TODO: Improve error handling instead of re-throwing error
      throw(error);
    });
  };
}
