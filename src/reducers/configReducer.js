import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function configReducer(state = initialState.configProps, action) {
  switch (action.type) {
    case types.CONFIG_PROPS_LOADED: {
      return Object.assign({}, action.configProps);
    }
    default: {
      return state;
    }
  }
}
