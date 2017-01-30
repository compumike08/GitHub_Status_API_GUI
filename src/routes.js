import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import OAuthReturner from './components/oauth/OAuthReturner';
import BranchPage from './components/repos/branches/BranchesPage';
import CommitsPage from './components/repos/branches/commits/CommitsPage';
import CombinedStatusPage from './components/repos/combinedStatus/CombinedStatusPage';

import CurrentStatusesPage from './components/repos/branches/commits/currentStatuses/CurrentStatusesPage';
import CreateStatusPage from './components/repos/createStatus/CreateStatusPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="oauthreturn" component={OAuthReturner}/>
    <Route path="repo/:repoId/branches" component={BranchPage}/>
    <Route path="repo/:repoId/branch/:branchName/commits" component={CommitsPage}/>
    <Route path="repo/:repoId/branch/:branchName/commit/:commitSha/statuses" component={CurrentStatusesPage}/>
    <Route path="repo/:repoId/branch/:branchName/commit/:commitSha/status" component={CreateStatusPage}/>

    <Route path="repo/:repoId/branch/:branchName/combinedStatus" component={CombinedStatusPage}/>
  </Route>
);
