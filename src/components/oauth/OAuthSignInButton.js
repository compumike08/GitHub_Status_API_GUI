import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as CONSTANTS from '../../utils/constants';
import * as oauthActions from '../../actions/oauthActions';
import GatekeeperApi from '../../api/gatekeeperAPI';
import GithubAPI from '../../api/githubAPI';

class OAuthSignInButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleOAuthClick = this.handleOAuthClick.bind(this);
    this.getTokenFromCode = this.getTokenFromCode.bind(this);
  }

  handleOAuthClick(){
    let currentThis = this;
    let isToken = currentThis.props.oauths.oauthReturnedToken.length === 0;

    if (isToken) {
      window.addEventListener('message', function windowReturnHandler(event) {
        let tempCode = event.data;
        window.removeEventListener('message', windowReturnHandler);
        currentThis.props.actions.storeOAuthTempCode(tempCode);
        currentThis.getTokenFromCode();
      });

      authenticate();
    }else{
      this.logoutGithub();
    }
  }

  getTokenFromCode(){
    GatekeeperApi.exchangeCodeForToken(this.props.oauths.oauthReturnedTempCode).then(result => {
      this.props.actions.storeOAuthToken(result);
      GithubAPI.addTokenToOcto(this.props.oauths.oauthReturnedToken);
    }).catch(error => {
      throw(error);
    });
  }

  logoutGithub(){
    GithubAPI.removeTokenFromOcto().then(() => {
      this.props.actions.destroyOAuthToken();
    });
  }

  render() {
    let isToken = this.props.oauths.oauthReturnedToken.length === 0;

    return (
      <button className={isToken === true ? "btn btn-success" : "btn btn-danger"} onClick={this.handleOAuthClick}>
        {isToken === true ? "Sign Into GitHub" : "Sign Out of GitHub"}
      </button>
    );
  }
}

OAuthSignInButton.propTypes = {
  actions: PropTypes.object.isRequired,
  oauths: PropTypes.object
};

function authenticate(){
  window.open(CONSTANTS.OAUTH_AUTHORIZE_URL, CONSTANTS.OAUTH_PROVIDER_NAME, "width=500,height=800");
}

function mapStateToProps(state) {
  return {
    oauths: state.oauths
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(oauthActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OAuthSignInButton);
