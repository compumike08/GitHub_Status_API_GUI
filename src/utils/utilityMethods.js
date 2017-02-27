import URLSearchParams from 'url-search-params';
import * as Axis from '../../node_modules/axis.js';
import {GITHUB_STATUS_STATES} from './constants';

export function getRepoById(repos, id){
  const repo = repos.find(repo => repo.id == id);

  if (repo){
    return repo;
  }else{
    return {};
  }
}

export function getBranchByName(branches, branchName){
  const branch = branches.find(branch => branch.name == branchName);

  if (branch){
    return branch;
  }else{
    return {};
  }
}

export function findCommitBySha(commits, sha){
  const commit = commits.find(commit => commit.sha == sha);

  if (commit){
    return commit;
  }else{
    return {};
  }
}

export function firstSevenOfSha(sha){
  return sha.slice(0, 7);
}

export function makeOptionsArrayFromStrings(stringArray){
  let optionsArray = stringArray.map(string => {
    return {
      value: string,
      text: string
    };
  });

  return optionsArray;
}

export function validateObjectExists(obj){
  let isValid = true;

  if(obj === null){
    isValid = false;
  }

  if(obj === undefined){
    isValid = false;
  }

  return isValid;
}

export function isEmpty(obj) {
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if input is a valid string
 *
 *  The input variable is valid if it is ALL of the following:
 *      1) variable is a string
 *      2) variable string length > 0
 *
 * @param inVar - input variable to check
 * @returns {boolean}
 */
export function isValidString(inVar){
  let isValid = false;

  if(Axis.isString(inVar)){
    if(inVar.length > 0){
      isValid = true;
    }
  }

  return isValid;
}

/**
 * Checks if a commit reference input value is valid.
 *
 * @param {String} ref - The commit reference input to be validated.
 * @returns {boolean} True if commit reference is valid, false otherwise.
 */
export function validateCommitReference(ref){
  // TODO: Improve validation of ref parameter input value
  let isRefParamValid = isValidString(ref);

  return isRefParamValid;
}

/**
 * Validates a GitHub status state input value against defined
 * constant values in the GITHUB_STATUS_STATES constant object.
 *
 * @param {String} statusState - The status state input to be validated.
 * @returns {boolean} True if statusState equals one of the constants defined in GITHUB_STATUS_STATES, false otherwise.
 */
export function validateGitHubStatusState(statusState){
  let isValid = false;

  for(let prop in GITHUB_STATUS_STATES){
    if(GITHUB_STATUS_STATES.hasOwnProperty(prop)){
      if(GITHUB_STATUS_STATES[prop] == statusState){
        isValid = true;
      }
    }
  }

  return isValid;
}

/**
 * Removes all duplicate elements from an array.
 *
 *  Reference: https://www.codementor.io/tips/8243973127/how-to-remove-duplicates-within-a-javascript-array-using-es6-in-just-one-line
 *
 * @param {Array} inputArray - The raw array to be deduplicated
 * @returns {Array} The deduplicated array
 */
export function deduplicateArray(inputArray){
  return Array.from(new Set(inputArray));
}

/**
 *
 * @param {string} paramName - The name of the parameter to extract
 * @param {string} urlString - The full url as a string from which to extract the parameter
 * @return {*} The extracted parameter value
 */
export function extractParamFromURL(paramName, urlString){
  /* Since URLSearchParams will ignore a param that starts with '?', we have to remove the '?'
   (and everything before it) from the link string before creating the URLSearchParams object. */
  let urlParamsString = urlString.slice(urlString.indexOf("?") + 1);
  let urlParams = new URLSearchParams(urlParamsString);

  return urlParams.get(paramName).toString();
}
