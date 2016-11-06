import React from 'react';
import OAuthSignInButton from '../oauth/OAuthSignInButton';
import ReposContainer from '../repos/ReposContainer';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
      return (
        <div>
          <div className="row">
            <div className="col-sm-3">
              <OAuthSignInButton/>
            </div>
          </div>

          <ReposContainer/>

        </div>
      );
  }
}

export default HomePage;
