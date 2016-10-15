import React from 'react';
import OAuthSignInButton from '../oauth/OAuthSignInButton';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
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
                  <a href="#" className="list-group-item">Test 1</a>
                  <a href="#" className="list-group-item">Test 2</a>
                  <a href="#" className="list-group-item">Test 3</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      );
  }
}

export default HomePage;
