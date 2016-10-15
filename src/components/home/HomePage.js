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
          <h3>Open browser console to see JSON data returned from GitHub API</h3>

          <div className="row">
            <div className="col-sm-3">
              <OAuthSignInButton/>
            </div>
          </div>

        </div>
      );
  }
}

export default HomePage;
