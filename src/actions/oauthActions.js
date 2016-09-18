import * as types from './actionTypes';

export function oauthTempCodeReceived(tempCode) {
    console.log("In action creator stub");
    return {type: types.OAUTH_TEMP_CODE_RECEIVED, tempCode};
}

export function storeOAuthTempCode(tempCode) {
  return function (dispatch, getState){
    console.log("In action creator middle");
    dispatch(oauthTempCodeReceived(tempCode));
  };
}
