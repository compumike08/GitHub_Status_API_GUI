import * as types from './actionTypes';

export function commitStatusesLoaded(statuses) {
    return {type: types.COMMIT_STATUSES_LOADED, statuses};
}

export function loadAllCommitStatuses(statuses) {
  return function (dispatch){
    dispatch(commitStatusesLoaded(statuses));
  };
}
