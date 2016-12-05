import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function statusReducer(state = initialState.repos, action) {
  switch (action.type) {
    case types.STATUSES_LOADED_FOR_COMMIT: {
      return action.statuses;
    }
    default: {
      return state;
    }
  }
}
