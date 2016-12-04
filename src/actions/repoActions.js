import * as types from './actionTypes';
import GithubAPI from '../api/githubAPI';
import {GITHUB_ACCOUNT_NAME} from '../utils/constants';

export function reposLoaded(repos){
  return {type: types.REPOS_LOADED, repos};
}

export function branchesLoadedForRepo(branches, repo){
  return {type: types.BRANCHES_LOADED_FOR_REPO, branches, repo};
}

export function commitsLoadedForBranch(commits, branch, repo){
  return {type: types.COMMITS_LOADED_FOR_BRANCH, commits, branch, repo};
}

export function loadRepos(){
  return function(dispatch, getState) {
    const currentState = getState();

    return GithubAPI.getUserOwnedRepos(GITHUB_ACCOUNT_NAME).then(repos => {
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

    let repo = findRepoByNameFromState(currentState.repos, repoName);

    return GithubAPI.getBranchesInRepo(repo.owner.login, repo.name).then(branches => {
      dispatch(branchesLoadedForRepo(branches, repo));
    }).catch(error => {
      //TODO: Improve error handling instead of re-throwing error
      throw(error);
    });
  };
}

export function loadCommitsForBranch(branchName, repoName){
  return function(dispatch, getState) {
    const currentState = getState();

    let repo = findRepoByNameFromState(currentState.repos, repoName);
    let branch = findBranchByNameFromRepo(repo, branchName);

    return GithubAPI.getCommitsOnBranch(repo.owner.login, repo.name, branch.name).then(commits => {
      dispatch(commitsLoadedForBranch(commits, branch, repo));
    }).catch(error => {
      //TODO: Improve error handling instead of re-throwing error
      throw(error);
    });

  };
}

function findRepoByNameFromState(currentStateRepos, repoNameToFind){
  let returnRepo = currentStateRepos.find(repo => repo.name == repoNameToFind);

  if ((returnRepo === undefined) || (returnRepo === null)){
    //TODO: Improve error handling for case when repo not found
    throw new Error("FATAL ERROR: Unable to find specified repo in current state", "repoActions.js");
  }

  return returnRepo;
}

function findBranchByNameFromRepo(repoObj, branchNameToFind){
  let returnBranch = repoObj.branches.find(branch => branch.name == branchNameToFind);

  if ((returnBranch === undefined) || (returnBranch === null)){
    //TODO: Improve error handling for case when branch not found
    throw new Error("FATAL ERROR: Unable to find specified branch in repo object", "repoActions.js");
  }

  return returnBranch;
}
