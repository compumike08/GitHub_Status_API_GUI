import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function repoReducer(state = initialState.repos, action) {
  switch (action.type) {
    case types.REPOS_LOADED: {
      return action.repos.map(repo => {
        return {
          ...repo,
          branches: []
        };
      });
    }
    case types.BRANCHES_LOADED_FOR_REPO: {
      let newRepo = state.find(filterRepo => filterRepo.name === action.repo.name);
      newRepo.branches = Array.from(action.branches);

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
