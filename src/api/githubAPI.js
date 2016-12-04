import {GITHUB_ACCOUNT_NAME,
  GITHUB_REPO_NAME} from '../utils/constants';
import * as Axis from '../../node_modules/axis.js';

let Octokat = require('octokat');

let octo = new Octokat({});

class GithubApi {

  /**
   * Creates new Octokat instance initialized with the oauth token passed to this method.
   *
   * https://github.com/philschatz/octokat.js#in-a-browser
   *
   * @param {String} token - The oauth token to store in new Octokat instance.
   * @returns {Promise} A promise which resolves after Octokat instance is created with oauth token.
   * @public
   */
  static addTokenToOcto(token){
    return new Promise(resolve => {
      octo = new Octokat({
        token: token
      });
      resolve();
    });
  }

  /**
   * Removes currently stored GitHub oauth token from Octokat instance by
   * overwriting current Octokat instance with a new, empty Ocktokat instance.
   *
   * https://github.com/philschatz/octokat.js#in-a-browser
   *
   * @returns {Promise} A promise which resolves after Octokat instance is overwritten.
   * @public
   */
  static removeTokenFromOcto(){
    return new Promise((resolve) => {
      octo = new Octokat({});
      resolve();
    });
  }

  /**
   * Gets the user object for the currently logged in user.
   *
   * https://developer.github.com/v3/users/#get-the-authenticated-user
   *
   * @returns {Promise} A promise which resolves to a user object, or rejects with a String error message.
   * @public
   */
  static getAuthenticatedUser(){
    return new Promise((resolve, reject) => {
      octo.user.fetch().then(result => {
        resolve(result);
      }).catch(error => {
        console.log(getErrorResponseMsg(error));
        reject("ERROR: GitHub responded with an error.");
      });
    });
  }

  /**
   * Gets a list of repositories owned and/or contributed to by the currently logged in user.
   *
   * https://developer.github.com/v3/repos/#list-your-repositories
   *
   * @returns {Promise} A promise which resolves to a list of repository objects, or rejects with a String error message.
   * @public
   */
  static getCurrentUserAllRepos(){
    return new Promise((resolve, reject) => {
      octo.fromUrl("/user/repos").fetch().then(result => {
        resolve(result);
      }).catch(error => {
        console.log(getErrorResponseMsg(error));
        reject("ERROR: GitHub responded with an error.");
      });
    });
  }

  /**
   * Gets a list of repositories owned by specified owner login.
   *
   * https://developer.github.com/v3/repos/#list-user-repositories
   *
   * @param {String} ownerLogin - The GitHub owner login name for which to get owned repos.
   * @returns {Promise} A promise which resolves to a list of repository objects, or rejects with a String error message.
   * @public
   */
  static getReposByOwner(ownerLogin){
    return new Promise((resolve, reject) => {
      octo.users(ownerLogin).repos.fetch().then(result => {
        resolve(result);
      }).catch(error => {
        console.log(getErrorResponseMsg(error));
        reject("ERROR: GitHub responded with an error.");
      });
    });
  }

  /**
   * Gets a list of branches in the specified repo.
   *
   * https://developer.github.com/v3/repos/branches/#list-branches
   *
   * @param {String} ownerLogin - The GitHub owner login name of the owner of the repo.
   * @param {String} repoName - The name of the repo.
   * @returns {Promise} A promise which resolves to a list of branch objects, or rejects with a String error message.
   * @public
   */
  static getBranchesInRepo(ownerLogin, repoName){
    return new Promise((resolve, reject) => {
      octo.repos(ownerLogin, repoName).branches.fetch().then(result => {
        resolve(result);
      }).catch(error => {
        console.log(getErrorResponseMsg(error));
        reject("ERROR: GitHub responded with an error when fetching branches in repo '" + ownerLogin + "/" + repoName + "'");
      });
    });
  }

  /**
   * Gets a list of commits on the specified branch in the specified repo.
   *
   * https://developer.github.com/v3/repos/commits/#list-commits-on-a-repository
   *
   * @param {String} ownerLogin - The GitHub owner login name of the owner of the repo.
   * @param {String} repoName - The name of the repo.
   * @param {String} branchName - The name of the branch.
   * @returns {Promise} A promise which resolves to a list of commit objects, or rejects with a String error message.
   * @public
   */
  static getCommitsOnBranch(ownerLogin, repoName, branchName){
    return new Promise((resolve, reject) => {
      octo.repos(ownerLogin, repoName).commits.fetch({sha: branchName}).then(result => {
        resolve(result);
      }).catch(error => {
        console.log(getErrorResponseMsg(error));
        reject("ERROR: GitHub responded with an error when fetching commits on branch '" + branchName + "' in repo '" + ownerLogin + "/" + repoName + "'");
      });
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
        octo.repos(GITHUB_ACCOUNT_NAME, GITHUB_REPO_NAME).commits(commitRef).statuses.fetch().then(result => {
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

/**
 * Parse 'error.message' from error JSON string to JavaScript object.
 *
 * @param {String} error - The error returned from GitHub as a JSON string.
 * @returns {Object} The 'error.message' JSON parsed to an object.
 * @private
 */
function parseErrorResponse(error){
  let errObj = JSON.parse(error.message);
  return errObj;
}

/**
 * Parse 'error.message.message' from error JSON string to JavaScript object.
 *
 * @param {String} error - The error returned from GitHub as a JSON string.
 * @returns {Object} The 'error.message.message' JSON parsed to an object.
 * @private
 */
function getErrorResponseMsg(error){
  let errObj = parseErrorResponse(error);
  let errMsg = errObj.message;

  return errMsg;
}

export default GithubApi;
