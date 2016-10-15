import React from 'react';
import OAuthSignInButton from '../oauth/OAuthSignInButton';
import GithubAPI from '../../api/githubAPI';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleGetUserRepos = this.handleGetUserRepos.bind(this);
  }

  handleGetUserRepos(evt){
    evt.preventDefault();

    GithubAPI.getCurrentUserRepos().then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
      return (
        <div>
          <h1>GitHub Status API GUI</h1>

          <div className="row">
            <div className="col-sm-3">
              <OAuthSignInButton/>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="panel panel-default">
                <div className="panel-heading">Repositories</div>
                <div className="panel-body">
                  <span className="bold">Select a repository:</span>
                </div>

                <div className="list-group">
                  <a href="#" className="list-group-item" onClick={this.handleGetUserRepos}>Get Current User Repos</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      );
  }
}

export default HomePage;
