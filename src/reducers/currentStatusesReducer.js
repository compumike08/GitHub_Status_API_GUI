import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {deduplicateArray} from '../utils/utilityMethods';

export default function currentStatusesReducer(state = initialState.currentCommitStatusesData, action) {
  switch (action.type) {
    case types.STATUSES_LOADED_FOR_CURRENT_COMMIT: {
      const rawContexts = action.statuses.map(status => {
        return status.context;
      });

      const newStatuses = action.statuses;

      const filteredStatusesByContexts = deduplicateArray(rawContexts).map(contextName => {
        return {
          context: contextName,
          statuses: newStatuses.filter(newStatus => contextName == newStatus.context)
        };
      });

      return {
        repoId: action.repoId,
        isFromBranch: action.isFromBranch,
        branchName: action.branchName,
        commitSha: action.commitSha,
        statuses: newStatuses,
        contexts: filteredStatusesByContexts
      };
    }
    case types.STATUS_CREATED_FOR_COMMIT: {
      let newRawContexts = Object.assign([], state.contexts);
      let newStatusesArray = Object.assign([], state.statuses);

      // Insert new status into beginning of array
      newStatusesArray.unshift(action.newStatus);
      newRawContexts.unshift(action.newStatus.context);

      let newFilteredStatusesByContexts = deduplicateArray(newRawContexts).map(contextName => {
        return {
          context: contextName,
          statuses: newStatusesArray.filter(newStatus => contextName == newStatus.context)
        };
      });

      return Object.assign({}, state, {
        statuses: newStatusesArray,
        contexts: newFilteredStatusesByContexts
      });
    }
    default: {
      return state;
    }
  }
}
