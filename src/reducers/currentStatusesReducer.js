import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {deduplicateArray} from '../utils/utilityMethods';

export default function currentStatusesReducer(state = initialState.currentCommitStatusesData, action) {
  switch (action.type) {
    case types.STATUSES_LOADED_FOR_CURRENT_COMMIT: {
      const rawContextsList = action.statuses.map(status => {
        return status.context;
      });

      const filteredContextsList = deduplicateArray(rawContextsList);

      return {
        repoId: action.repoId,
        isFromBranch: action.isFromBranch,
        branchName: action.branchName,
        commitSha: action.commitSha,
        statuses: action.statuses,
        contextsList: filteredContextsList
      };
    }
    case types.STATUS_CREATED_FOR_COMMIT: {
      let newRawContextsList = Object.assign([], state.contextsList);
      let newStatusesArray = Object.assign([], state.statuses);

      // Insert new status into beginning of array
      newStatusesArray.unshift(action.newStatus);
      newRawContextsList.unshift(action.newStatus.context);

      let newFilteredContextsList = deduplicateArray(newRawContextsList);

      return Object.assign({}, state, {
        statuses: newStatusesArray,
        contextsList: newFilteredContextsList
      });
    }
    default: {
      return state;
    }
  }
}
