import React from 'react';
import GithubAPI from '../../api/githubAPI';
import OAuthSignInButton from '../oauth/OAuthSignInButton';
import {GITHUB_REFS} from '../../utils/constants';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.invokeGetStatusesForCommit = this.invokeGetStatusesForCommit.bind(this);
  }

  invokeGetStatusesForCommit(){
    GithubAPI.getStatusesForCommit(GITHUB_REFS.MASTER).then(statuses => {
      console.log(statuses);
    }).catch(errMsg => {
      console.log(errMsg);
    });
  }

  render() {
      return (
        <div>
          <h1>GitHub Status API GUI</h1>
          <h3>Open browser console to see JSON data returned from GitHub API</h3>

          <div className="row">
            <div className="col-sm-3">
              <OAuthSignInButton/>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="btn-toolbar">
                <div className="btn-group">
                  <button type="button" className="btn btn-primary " onClick={this.invokeGetStatusesForCommit}>Get Commit Statuses</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      );
  }
}

export default HomePage;
