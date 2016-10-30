import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import OAuthReturner from './components/oauth/OAuthReturner';
import BranchPage from './components/repos/branches/BranchesPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="oauthreturn" component={OAuthReturner}/>
        <Route path="repobranches/:id" component={BranchPage}/>
    </Route>
);
