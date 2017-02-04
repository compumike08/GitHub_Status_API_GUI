import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
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
    <Redirect from="repo" to="/"/>

    <Route path="oauthreturn" component={OAuthReturner}/>

    <Redirect from="repo/:repoId/branch" to="repo/:repoId/branches"/>
    <Route path="repo/:repoId/branches" component={BranchPage}/>

    <Redirect from="repo/:repoId/branch/:branchName/commit" to="repo/:repoId/branch/:branchName/commits" />
    <Route path="repo/:repoId/branch/:branchName/commits" component={CommitsPage}/>
    <Route path="repo/:repoId/branch/:branchName/commit/:commitSha/statuses" component={CurrentStatusesPage}/>
    <Route path="repo/:repoId/branch/:branchName/commit/:commitSha/status" component={CreateStatusPage}/>

    <Route path="repo/:repoId/branch/:branchName/combinedStatus" component={CombinedStatusPage}/>
  </Route>
);
