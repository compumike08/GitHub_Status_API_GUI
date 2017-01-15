import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function currentStatusesReducer(state = initialState.currentCommitStatusesData, action) {
  switch (action.type) {
    case types.STATUSES_LOADED_FOR_CURRENT_COMMIT: {
      return {
        repoId: action.repoId,
        isFromBranch: action.isFromBranch,
        branchName: action.branchName,
        commit: action.commit,
        statuses: action.statuses
      };
    }
    default: {
      return state;
    }
  }
}
