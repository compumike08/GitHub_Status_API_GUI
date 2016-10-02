import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function statusReducer(state = initialState.commitStatuses, action) {
  switch (action.type) {
    case types.COMMIT_STATUSES_LOADED:
      return action.statuses;
    default:
      return state;
  }
}
