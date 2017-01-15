import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import OAuthReturner from './components/oauth/OAuthReturner';
import BranchPage from './components/repos/branches/BranchesPage';
import CommitsPage from './components/repos/branches/commits/CommitsPage';
import CombinedStatusPage from './components/repos/combinedStatus/CombinedStatusPage';

import CurrentStatusPage from './components/repos/currentStatus/CurrentStatusPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="oauthreturn" component={OAuthReturner}/>
        <Route path="repobranches/:id" component={BranchPage}/>
        <Route path="repobranches/:id/commits/:branchName" component={CommitsPage}/>
        <Route path="combinedStatus/repo/:repoId/branch/:branchName" component={CombinedStatusPage}/>

        <Route path="currentStatuses" component={CurrentStatusPage}/>
    </Route>
);
