import * as types from './actionTypes';
import ConfigServerApi from '../api/configServerAPI';

export function configPropsLoaded(configProps) {
  return {type: types.CONFIG_PROPS_LOADED, configProps};
}

export function loadConfigProps() {
  return function (dispatch) {
    return ConfigServerApi.getConfigProps().then(configProps => {
      dispatch(configPropsLoaded(configProps));
    }).catch(error => {
      console.log(error);
      //TODO: Improve error handling instead of re-throwing error
      throw(error);
    });
  };
}
