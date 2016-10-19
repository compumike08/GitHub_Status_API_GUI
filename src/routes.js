import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import OAuthReturner from './components/oauth/OAuthReturner';
import BranchList from './components/repos/branches/BranchesList';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="oauthreturn" component={OAuthReturner}/>
        <Route path="repobranches/:id" component={BranchList}/>
    </Route>
);
