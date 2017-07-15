import * as types from './actionTypes';
import ConfigServerApi from '../api/configServerAPI';

export function configPropsLoaded(configs) {
  return {type: types.CONFIG_PROPS_LOADED, configs};
}

export function loadConfigProps() {
  return function (dispatch) {
    return ConfigServerApi.getConfigProps().then(configs => {
      dispatch(configPropsLoaded(configs));
    }).catch(error => {
      console.log(error);
      //TODO: Improve error handling instead of re-throwing error
      throw(error);
    });
  };
}
