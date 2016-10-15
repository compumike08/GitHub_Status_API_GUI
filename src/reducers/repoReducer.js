import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function repoReducer(state = initialState.repos, action) {
    switch (action.type) {
        case types.REPOS_LOADED:
            return action.repos;
        default:
          return state;
  }
}
