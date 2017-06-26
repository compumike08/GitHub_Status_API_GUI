import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {OAUTH_PROVIDER_NAME, OAUTH_GH_REPO_STATUS_SCOPES} from '../../utils/constants';
import * as GithubServices from '../../services/githubServices';
import * as oauthActions from '../../actions/oauthActions';
import * as repoActions from '../../actions/repoActions';

import toastr from 'toastr';

class OAuthSignInButton extends React.Component {
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

  notifyAuthSuccess(){
    this.resetGitHubTempCodeFlag();
    toastr.success("Logged into GitHub successfully!");
  }

  notifyAuthFailure(errMsg){
    this.resetGitHubTempCodeFlag();
    toastr.error(errMsg);
  }

  resetGitHubTempCodeFlag(){
    this.setState({isOAuthTempCodeReceived: false});
  }

  setGitHubTempCodeFlag(){
    this.setState({isOAuthTempCodeReceived: true});
  }

  getTokenFromCode(oauthTempCode){
    this.props.oauthActions.exchangeCodeForToken(oauthTempCode).then(() => {
      GithubServices.loadStoredTokenIntoOcto(this.props.oauths.oauthReturnedToken).then(() => {
        this.props.oauthActions.loadAuthenticatedUser().then(() => {
          this.notifyAuthSuccess();
        }).catch(error => {
          console.log(error);
          this.notifyAuthFailure("Unable to load authenticated GitHub user data.");
        });
      }).catch(error => {
        console.log(error);
        this.notifyAuthFailure("Unable to load authenticated OAuth token into Octokat instance.");
      });
    }).catch(error => {
      console.log(error);
      this.notifyAuthFailure("GitHub Login Failed!");
    });
  }

  logoutGithub(){
    this.props.oauthActions.destroyOAuthToken().then(() => {
      this.resetGitHubTempCodeFlag();
      toastr.success("Successfully logged out of GitHub!");
    }).catch(error => {
      console.log(error);
      toastr.error("Unable to log out of GitHub!");
    });
  }

  render() {
    let authenticatedUser = this.props.oauths.authenticatedUser;
    let classesString = "btn btn-success";
    let buttonLabel = "Sign Into GitHub";
    let isDisabled = false;

    if(this.state.isOAuthTempCodeReceived === true){
      classesString = "btn btn-warning";
      buttonLabel = "Signing In...";
      isDisabled = true;
    }else{
      if(authenticatedUser.id){
        classesString = "btn btn-danger";
        buttonLabel = "Sign Out of GitHub";
        isDisabled = false;
      }
    }

    return (
      <button type="button" className={classesString} disabled={isDisabled} onClick={this.handleOAuthClick}>
        {buttonLabel}
      </button>
    );
  }
}

OAuthSignInButton.propTypes = {
  oauthActions: PropTypes.object,
  repoActions: PropTypes.object,
  configs: PropTypes.object,
  oauths: PropTypes.object
};

function authenticate(currentThis){
  const windowClosedCheckRepeatInterval = 500;
  const CLIENT_ID = currentThis.props.configs.CLIENT_ID;
  const OAUTH_AUTHORIZE_URL = currentThis.props.configs.OAUTH_AUTHORIZE_URL;

  //each scope in the builtScopeList string should be separated by a space
  let builtScopeList = OAUTH_GH_REPO_STATUS_SCOPES.join(' ');
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
        currentThis.notifyAuthFailure("GitHub Login Cancelled");
      }
    }
  }

  function windowReturnHandler(event) {
    let tempCode = event.data;
    window.removeEventListener('message', windowReturnHandler);
    currentThis.setGitHubTempCodeFlag();
    currentThis.getTokenFromCode(tempCode);
  }
}

function mapStateToProps(state) {
  return {
    configs: state.configs,
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
