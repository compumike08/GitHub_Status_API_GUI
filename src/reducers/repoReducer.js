import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function repoReducer(state = initialState.repos, action) {
  switch (action.type) {
    case types.REPOS_LOADED: {
      return action.repos.map(repo => {
        return {
          ...repo,
          branches: null
        };
      });
    }
    case types.BRANCHES_LOADED_FOR_REPO: {
      let newRepo = state.find(filterRepo => filterRepo.name === action.repo.name);
      newRepo.branches = Array.from(action.branches);

      newRepo.branches = newRepo.branches.map(branch => {
        let newBranchObj = {
          ...branch,
          commits: null
        };

        return newBranchObj;
      });

      return [
        ...state.filter(filterRepo => filterRepo.name !== action.repo.name),
        Object.assign({}, newRepo)
      ];
    }
    case types.COMMITS_LOADED_FOR_BRANCH: {
      let newRepo = state.find(filterRepo => filterRepo.name === action.repo.name);
      let findBranchIndex = newRepo.branches.findIndex(findBranch => findBranch.name === action.branch.name);

      newRepo.branches[findBranchIndex].commits = Array.from(action.commits);

      newRepo.branches[findBranchIndex].commits = newRepo.branches[findBranchIndex].commits.map(commit => {
        let newCommitObj = {
          ...commit,
          statuses: null
        };

        return newCommitObj;
      });

      return [
        ...state.filter(filterRepo => filterRepo.name !== action.repo.name),
        Object.assign({}, newRepo)
      ];
    }
    case types.STATUSES_LOADED_FOR_COMMIT: {
      let newRepo = getRepoFromState(action.repo.name, state);
      let findBranchIndex = getBranchIndexFromRepo(action.branch.name, newRepo);
      let findCommitIndex = getCommitIndexFromBranch(action.commit.sha, newRepo.branches[findBranchIndex]);

      newRepo.branches[findBranchIndex].commits[findCommitIndex].statuses = Array.from(action.statuses);

      return [
        ...state.filter(filterRepo => filterRepo.name !== action.repo.name),
        Object.assign({}, newRepo)
      ];
    }
    default: {
      return state;
    }
  }
}

/**
 * Find repo by repo name in Redux state
 *
 * @param {String} actionRepoName - The name of the repo to search for from action.repo.name variable.
 * @param {object} state - The current Redux state.
 * @returns {object} The found repository object.
 * @private
 */
function getRepoFromState(actionRepoName, state){
  let newRepo = state.find(filterRepo => filterRepo.name === actionRepoName);

  if(newRepo === undefined){
    throw new Error("ERROR: No repo could be found in 'state' parameter matching the repo value from 'action.repo.name' variable in 'getRepoFromState' method.", "repoReducer.js");
  }else if(newRepo === null){
    throw new Error("ERROR: Null value encountered when searching for matching repo in 'state' parameter in 'getRepoFromState' method.", "repoReducer.js");
  }else{
    return newRepo;
  }
}

/**
 * Find branch by branch name in repo from state
 *
 * @param {String} actionBranchName - The branch name to search for from action.branch.name variable.
 * @param {object} repo - The current repo object.
 * @returns {number} The found branch index.
 * @private
 */
function getBranchIndexFromRepo(actionBranchName, repo){
  let findBranchIndex = repo.branches.findIndex(findBranch => findBranch.name === actionBranchName);

  if(findBranchIndex === undefined){
    throw new Error("ERROR: No branch could be found in repo parameter matching the branch name value from 'action.branch.name' variable in 'getBranchIndexFromRepo' method.", "repoReducer.js");
  }else if(findBranchIndex === null){
    throw new Error("ERROR: Null value encountered when searching for matching branch name in 'repo' parameter in 'getBranchIndexFromRepo' method.", "repoReducer.js");
  }else{
    return findBranchIndex;
  }
}

/**
 * Find commit by commit sha in branch from repo from state
 *
 * @param {String} actionCommitSha - The commit sha to search for from action.commit.sha variable.
 * @param {object} branch - The current branch object.
 * @returns {number} The found commit index.
 * @private
 */
function getCommitIndexFromBranch(actionCommitSha, branch){
  let findCommitIndex = branch.commits.findIndex(findCommit => findCommit.sha === actionCommitSha);

  if(findCommitIndex === undefined){
    throw new Error("ERROR: No commit could be found in branch parameter matching the commit sha value from 'action.commit.sha' variable in 'getCommitIndexFromBranch' method.", "repoReducer.js");
  }else if(findCommitIndex === null){
    throw new Error("ERROR: Null value encountered when searching for matching commit sha in 'branch' parameter in 'getCommitIndexFromBranch' method.", "repoReducer.js");
  }else{
    return findCommitIndex;
  }
}
