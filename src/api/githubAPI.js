import {GITHUB_USER_NAME,
  GITHUB_REPO_NAME} from '../utils/constants';
import * as Axis from '../../node_modules/axis.js';

let Octokat = require('octokat');

let octo = new Octokat({});

class GithubApi {
  static addTokenToOcto(token){
    octo = new Octokat({
      token: token
    });
  }

  static removeTokenFromOcto(){
    return new Promise((resolve) => {
      octo = new Octokat({});
      resolve();
    });
  }

  /**
   * Gets a list of statuses for the specified commit reference in reverse chronological order.
   *
   * https://developer.github.com/v3/repos/statuses/#list-statuses-for-a-specific-ref
   *
   * @param {String} commitRef - A string specifying the commit reference (can be commit SHA ID, branch name, or tag name).
   * @returns {Promise} A promise which resolves to a list of commit status objects, or rejects with a String error message.
   * @public
   */
  static getStatusesForCommit(commitRef){
    return new Promise((resolve, reject) => {
      let isCommitRefParamValid = false;

      if(Axis.isString(commitRef) === true){
        if(commitRef.length > 0){
          isCommitRefParamValid = true;
        }
      }

      if(isCommitRefParamValid){
        octo.repos(GITHUB_USER_NAME, GITHUB_REPO_NAME).commits(commitRef).statuses.fetch().then(result => {
          resolve(result);
        }).catch(error => {
          console.log(getErrorResponseMsg(error));
          reject("ERROR: GitHub responded with an error.");
        });
      }else{
        reject("ERROR: Invalid commitRef parameter passed to GithubApi component.");
      }

    });
  }
}

function parseErrorResponse(error){
  let errObj = JSON.parse(error.message);
  return errObj;
}

function getErrorResponseMsg(error){
  let errObj = parseErrorResponse(error);
  let errMsg = errObj.message;

  return errMsg;
}

export default GithubApi;
