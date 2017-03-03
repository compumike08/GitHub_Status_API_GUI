import GitHub from 'github-api';
import * as utilityMethods from '../utils/utilityMethods';

let ghInstance = new GitHub({});

class GithubApi {

  /**
   * Creates new GitHub instance initialized with the oauth token passed to this method.
   *
   * http://github-tools.github.io/github/docs/3.1.0/GitHub.html
   * http://github-tools.github.io/github/docs/3.1.0/Requestable.html#.auth
   *
   * @param {String} token - The oauth token to store in new GitHub instance.
   * @returns {Promise} A promise which resolves after GitHub instance is created with oauth token.
   * @public
   */
  static addTokenToGhApi(token) {
    return new Promise(resolve => {
      ghInstance = new GitHub({
        token: token
      });
      resolve();
    });
  }

  /**
   * Removes currently stored GitHub oauth token from GitHub instance by
   * overwriting current GitHub instance with a new, empty GitHub instance.
   *
   * http://github-tools.github.io/github/docs/3.1.0/GitHub.html
   * http://github-tools.github.io/github/docs/3.1.0/Requestable.html#.auth
   *
   * @returns {Promise} A promise which resolves after GitHub instance is overwritten.
   * @public
   */
  static removeTokenFromGhApi() {
    return new Promise((resolve) => {
      ghInstance = new GitHub({});
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
  static getAuthenticatedUser() {
    return new Promise((resolve, reject) => {
      let user = ghInstance.getUser();

      user.getProfile().then(response => {
        resolve(response.data);
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
  static getCurrentUserAllRepos() {
    return new Promise((resolve, reject) => {
      let ownerUser = ghInstance.getUser();

      let configOptions = {
        type: "owner"
      };

      ownerUser.listRepos(configOptions).then(response => {
        resolve(response.data);
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
  static getReposByOwner(ownerLogin) {
    return new Promise((resolve, reject) => {
      let ownerUser = ghInstance.getUser(ownerLogin);

      let configOptions = {
        type: "owner"
      };

      ownerUser.listRepos(configOptions).then(response => {
        resolve(response.data);
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
  static getBranchesInRepo(ownerLogin, repoName) {
    return new Promise((resolve, reject) => {
      let repo = ghInstance.getRepo(ownerLogin, repoName);

      repo.listBranches().then(response => {
        resolve(response.data);
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
  static getCommitsOnBranch(ownerLogin, repoName, branchName) {
    return new Promise((resolve, reject) => {
      let repo = ghInstance.getRepo(ownerLogin, repoName);

      let options = {
        sha: branchName
      };

      repo.listCommits(options).then(response => {
        resolve(response.data);
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
   * @param {String} ownerLogin - The GitHub owner login name of the owner of the repo.
   * @param {String} repoName - The name of the repo.
   * @param {String} commitRef - A string specifying the commit reference (can be commit SHA ID, branch name, or tag name).
   * @returns {Promise} A promise which resolves to a list of commit status objects, or rejects with a String error message.
   * @public
   */
  static getStatusesForCommit(ownerLogin, repoName, commitRef) {
    return new Promise((resolve, reject) => {
      let isCommitRefParamValid = utilityMethods.validateCommitReference(commitRef);

      if (isCommitRefParamValid) {
        let repo = ghInstance.getRepo(ownerLogin, repoName);

        repo.listStatuses(commitRef).then(response => {
          resolve(response.data);
        }).catch(error => {
          console.log(getErrorResponseMsg(error));
          reject("ERROR: GitHub responded with an error.");
        });
      } else {
        reject("ERROR: Invalid commitRef parameter passed to GithubApi component.");
      }
    });
  }

  /**
   * Gets the latest status for each context, as well as a
   * single combined 'state', for the specified commit reference.
   *
   * https://developer.github.com/v3/repos/statuses/#get-the-combined-status-for-a-specific-ref
   *
   * @param {String} ownerLogin - The GitHub owner login name of the owner of the repo.
   * @param {String} repoName - The name of the repo.
   * @param {String} ref - A string specifying the commit reference (can be commit SHA ID, branch name, or tag name).
   * @returns {Promise} A promise which resolves to a combined status object, or rejects with a String error message.
   * @public
   */
  static getCombinedStatusForRef(ownerLogin, repoName, ref) {
    return new Promise((resolve, reject) => {
      reject("Support for the combined status endpoint is not yet available in the Github.js library");

      /*
      let isCommitRefParamValid = utilityMethods.validateCommitReference(ref);

      if (isCommitRefParamValid) {
        ghInstance.repos(ownerLogin, repoName).commits(ref).status.fetch().then(result => {
          resolve(result);
      }).catch(error => {
          console.log(getErrorResponseMsg(error));
          reject("ERROR: GitHub responded with an error.");
      });
      } else {
        reject("ERROR: Invalid ref parameter passed to GithubApi component.");
      }
      */
    });
  }

  /**
   * Creates a new status on the specified commit.
   *
   * https://developer.github.com/v3/repos/statuses/#create-a-status
   *
   * @param {String} ownerLogin - The GitHub owner login name of the owner of the repo.
   * @param {String} repoName - The name of the repo.
   * @param {String} commitSha - The sha of the commit for which the new status should be created.
   * @param {String} state - The state to set for the new status ("pending", "success", "error", or "failure").
   * @param {String} description - The description to set for the new status.
   * @param {String} targetUrl - A URL related to the new status (e.g. link to output from CI server build
   *                              which triggered status).
   * @param {String} context - The name of the context under which the status should be created.
   * @returns {Promise} A promise which resolves to the newly created status object, or rejects with a String
   *                    error message.
   * @public
   */
  static createStatusForCommit(ownerLogin, repoName, commitSha, state, description, targetUrl, context) {
    return new Promise((resolve, reject) => {
      let isCommitRefParamValid = utilityMethods.validateCommitReference(commitSha);

      if (isCommitRefParamValid) {
        let repo = ghInstance.getRepo(ownerLogin, repoName);
        let createParams = {};

        if (utilityMethods.validateGitHubStatusState(state)) {
          createParams.state = state;
        } else {
          throw new Error("Invalid GitHub status state string passed to createStatusForCommit method in GithubApi componenet.");
        }

        if (utilityMethods.isValidString(description)) {
          createParams.description = description;
        }

        if (utilityMethods.isValidString(targetUrl)) {
          createParams.target_url = targetUrl;
        }

        if (utilityMethods.isValidString(context)) {
          createParams.context = context;
        }

        repo.updateStatus(commitSha, createParams).then(response => {
          resolve(response.data);
        }).catch(error => {
          console.log(getErrorResponseMsg(error));
          reject("ERROR: GitHub responded with an error.");
        });
      } else {
        reject("ERROR: Invalid ref parameter passed to GithubApi component.");
      }
    });
  }
}

/**
 * Processes an HTTP response object and wraps it in a pagination object.
 *
 * @param {Object} responseObj - The HTTP response object to be processed
 * @return {{pageData: *, pageNum: *, lastPageNum: (*|Number)}} The response data wrapped in a pagination object
 * @private
 */
function processPagination(responseObj){
  const REL_SEARCH_START_STRING = "rel=\"";
  const REL_SEARCH_END_STRING = "\"";
  const REL_SEARCH_STRING_LEN = REL_SEARCH_START_STRING.length;
  const LINK_SEARCH_START_STRING = "<";
  const LINK_SEARCH_END_STRING = ">";
  const LINK_SEARCH_START_STRING_LEN = LINK_SEARCH_START_STRING.length;

  let requestURL = responseObj.request.responseURL;
  let currentPageNum = utilityMethods.extractParamFromURL("page", requestURL);
  let pageLinkString = responseObj.headers.link;
  let lastPageNum;

  if(pageLinkString){
    let pageLinkArray = pageLinkString.split(", ");
    let parsedPageArray = [];

    pageLinkArray.forEach(pageLink => {
      let relStartIdx = pageLink.indexOf(REL_SEARCH_START_STRING) + REL_SEARCH_STRING_LEN;
      let relStopIdx = pageLink.indexOf(REL_SEARCH_END_STRING, relStartIdx);

      let linkStartIdx = pageLink.indexOf(LINK_SEARCH_START_STRING) + LINK_SEARCH_START_STRING_LEN;
      let linkStopIdx = pageLink.indexOf(LINK_SEARCH_END_STRING, linkStartIdx);

      let relNameString = pageLink.slice(relStartIdx, relStopIdx);
      let linkString = pageLink.slice(linkStartIdx, linkStopIdx);

      let pageNumValue = utilityMethods.extractParamFromURL("page", linkString);

      let newPageLinkObj = {
        rel: relNameString,
        link: linkString,
        pageNum: pageNumValue
      };

      parsedPageArray.push(newPageLinkObj);
    });

    lastPageNum = parsedPageArray.find(parsedPage => parsedPage.rel == "last").pageNum;
  }else{
    lastPageNum = 1;
  }

  let constructedResponseObj = {
    pageData: responseObj.data,
    pageNum: currentPageNum,
    lastPageNum: lastPageNum
  };

  return constructedResponseObj;
}

/**
 * Extracts error message from error returned from Github.js library.
 *
 * @param {Error} error - The error returned from GitHub.js library.
 * @returns {string} The 'error.message' string extracted from the Error.
 * @private
 */
function getErrorResponseMsg(error) {
  let errMsg = error.message;
  return errMsg;
}

export default GithubApi;
