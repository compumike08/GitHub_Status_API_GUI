export default {
  configs: null,
  oauths: {
    oauthReturnedToken: "",
    authenticatedUser: {}
  },
  combinedStatusData: {
    repoId: null,
    branchName: null,
    combinedStatus: null
  },
  currentCommitStatusesData: {
    repoId: null,
    isFromBranch: null,
    branchName: null,
    commitSha: null,
    statuses: null,
    contexts: null
  },
  currentPaginationState: {
    currentPageNum: 0,
    totalNumPages: 0
  },
  repos: null
};
