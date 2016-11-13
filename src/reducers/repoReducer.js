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
      let tempBranchArray = Array.from(action.branches);
      newRepo.branches = tempBranchArray.map(tempBranch => {
        return tempBranch.name;
      });

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
