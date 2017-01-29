import * as Axis from '../../node_modules/axis.js';

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
