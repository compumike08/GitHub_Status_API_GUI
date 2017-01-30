import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function currentStatusesReducer(state = initialState.currentCommitStatusesData, action) {
  switch (action.type) {
    case types.STATUSES_LOADED_FOR_CURRENT_COMMIT: {
      return {
        repoId: action.repoId,
        isFromBranch: action.isFromBranch,
        branchName: action.branchName,
        commitSha: action.commitSha,
        statuses: action.statuses
      };
    }
    case types.STATUS_CREATED_FOR_COMMIT: {
      let newStatusesArray = Object.assign([], state.statuses);

      // Insert new status into beginning of array
      newStatusesArray.unshift(action.newStatus);

      return Object.assign({}, state, {statuses: newStatusesArray});
    }
    default: {
      return state;
    }
  }
}
