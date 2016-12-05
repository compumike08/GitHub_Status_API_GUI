import * as types from './actionTypes';

export function commitStatusesLoaded(statuses) {
    return {type: types.STATUSES_LOADED_FOR_COMMIT, statuses};
}

export function loadAllCommitStatuses(statuses) {
  return function (dispatch){
    dispatch(commitStatusesLoaded(statuses));
  };
}
