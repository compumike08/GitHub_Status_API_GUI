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
