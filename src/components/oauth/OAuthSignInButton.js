import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {OAUTH_AUTHORIZE_URL,
  OAUTH_PROVIDER_NAME,
  CLIENT_ID,
  OAUTH_GH_REPO_STATUS_SCOPE} from '../../utils/constants';
import * as GithubServices from '../../services/githubServices';
import * as oauthActions from '../../actions/oauthActions';
import * as repoActions from '../../actions/repoActions';

import toastr from 'toastr';

class OAuthSignInButton extends React.Component {
  static notifyAuthSuccess(){
    toastr.success("Logged into GitHub successfully!");
  }

  static notifyAuthFailure(errMsg){
    toastr.error(errMsg);
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      isOAuthTempCodeReceived: false
    };

    this.handleOAuthClick = this.handleOAuthClick.bind(this);
    this.getTokenFromCode = this.getTokenFromCode.bind(this);
  }

  handleOAuthClick(){
    let currentThis = this;
    let isToken = currentThis.props.oauths.oauthReturnedToken.length !== 0;

    // if token does not exist, then login to GitHub; otherwise logout of GitHub.
    if (!isToken) {
      authenticate(currentThis);
    }else{
      this.logoutGithub();
    }
  }

  getTokenFromCode(oauthTempCode){
    this.props.oauthActions.exchangeCodeForToken(oauthTempCode).then(() => {
      GithubServices.loadStoredTokenIntoOcto(this.props.oauths.oauthReturnedToken).then(() => {
        this.props.oauthActions.loadAuthenticatedUser().then(() => {
          OAuthSignInButton.notifyAuthSuccess();
        }).catch(error => {
          console.log(error);
          OAuthSignInButton.notifyAuthFailure("Unable to load authenticated GitHub user data.");
        });
      }).catch(error => {
        console.log(error);
        OAuthSignInButton.notifyAuthFailure("Unable to load authenticated OAuth token into Octokat instance.");
      });
    }).catch(error => {
      console.log(error);
      OAuthSignInButton.notifyAuthFailure("GitHub Login Failed!");
    });
  }

  logoutGithub(){
    this.props.oauthActions.destroyOAuthToken().then(() => {
      this.setState({isOAuthTempCodeReceived: false});
      toastr.success("Successfully logged out of GitHub!");
    }).catch(error => {
      console.log(error);
      toastr.error("Unable to log out of GitHub!");
    });
  }

  render() {
    let isToken = this.props.oauths.oauthReturnedToken.length === 0;

    return (
      <button type="button" className={isToken === true ? "btn btn-success" : "btn btn-danger"} onClick={this.handleOAuthClick}>
        {isToken === true ? "Sign Into GitHub" : "Sign Out of GitHub"}
      </button>
    );
  }
}

OAuthSignInButton.propTypes = {
  oauthActions: PropTypes.object,
  repoActions: PropTypes.object,
  oauths: PropTypes.object
};

function authenticate(currentThis){
  const windowClosedCheckRepeatInterval = 500;
  //each scope in the builtScopeList string should be separated by a space
  let builtScopeList = OAUTH_GH_REPO_STATUS_SCOPE;
  let builtOAuthRequestURL = encodeURI(OAUTH_AUTHORIZE_URL + "?client_id=" + CLIENT_ID + "&scope=" + builtScopeList);
  let timer, authWindow;

  window.addEventListener('message', windowReturnHandler);

  authWindow = window.open(builtOAuthRequestURL, OAUTH_PROVIDER_NAME, "width=500,height=800");

  timer = setInterval(checkAuthWindow, windowClosedCheckRepeatInterval);

  function checkAuthWindow() {
    if (authWindow.closed) {
      clearInterval(timer);

      if(!currentThis.state.isOAuthTempCodeReceived){
        window.removeEventListener('message', windowReturnHandler);
        OAuthSignInButton.notifyAuthFailure("GitHub Login Cancelled");
      }
    }
  }

  function windowReturnHandler(event) {
    let tempCode = event.data;
    window.removeEventListener('message', windowReturnHandler);
    currentThis.setState({isOAuthTempCodeReceived: true});
    currentThis.getTokenFromCode(tempCode);
  }
}

function mapStateToProps(state) {
  return {
    oauths: state.oauths
  };
}

function mapDispatchToProps(dispatch) {
  return {
    oauthActions: bindActionCreators(oauthActions, dispatch),
    repoActions: bindActionCreators(repoActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OAuthSignInButton);
