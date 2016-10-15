import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {OAUTH_AUTHORIZE_URL,
  OAUTH_PROVIDER_NAME,
  CLIENT_ID,
  OAUTH_GH_REPO_STATUS_SCOPE} from '../../utils/constants';
import * as oauthActions from '../../actions/oauthActions';
import * as repoActions from '../../actions/repoActions';
import GatekeeperApi from '../../api/gatekeeperAPI';
import GithubAPI from '../../api/githubAPI';

import toastr from 'toastr';

class OAuthSignInButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleOAuthClick = this.handleOAuthClick.bind(this);
    this.getTokenFromCode = this.getTokenFromCode.bind(this);
  }

  handleOAuthClick(){
    let currentThis = this;
    let isToken = currentThis.props.oauths.oauthReturnedToken.length !== 0;

    // if token does not exist, then login to GitHub; otherwise logout of GitHub.
    if (!isToken) {
      window.addEventListener('message', function windowReturnHandler(event) {
        let tempCode = event.data;
        window.removeEventListener('message', windowReturnHandler);
        currentThis.props.oauthActions.storeOAuthTempCode(tempCode);
        currentThis.getTokenFromCode();
      });

      authenticate();
    }else{
      this.logoutGithub();
    }
  }

  getTokenFromCode(){
    GatekeeperApi.exchangeCodeForToken(this.props.oauths.oauthReturnedTempCode).then(result => {
      this.props.oauthActions.storeOAuthToken(result);
      GithubAPI.addTokenToOcto(this.props.oauths.oauthReturnedToken).then(() => {
        this.props.repoActions.loadRepos().then(() => {
          toastr.success("Repo list fetched successfully!");
        }).catch(error => {
          console.log(error);
          toastr.error("Repo list fetch failed!");
        });
      });
    }).catch(error => {
      throw(error);
    });
  }

  logoutGithub(){
    GithubAPI.removeTokenFromOcto().then(() => {
      this.props.oauthActions.destroyOAuthToken();
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
  oauthActions: PropTypes.object.isRequired,
  repoActions: PropTypes.object.isRequired,
  oauths: PropTypes.object
};

function authenticate(){
  //each scope in the builtScopeList string should be separated by a space
  let builtScopeList = OAUTH_GH_REPO_STATUS_SCOPE;
  let builtOAuthRequestURL = encodeURI(OAUTH_AUTHORIZE_URL + "?client_id=" + CLIENT_ID + "&scope=" + builtScopeList);

  window.open(builtOAuthRequestURL, OAUTH_PROVIDER_NAME, "width=500,height=800");
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
