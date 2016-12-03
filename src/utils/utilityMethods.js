export function getRepoById(repos, id){
  const repo = repos.find(repo => repo.id == id);

  if (repo){
    return repo;
  }else{
    return {};
  }
}

export function getBranchById(branches, id){
  const branch = branches.find(branch => branch.id == id);

  if (branch){
    return branch;
  }else{
    return {};
  }
}
