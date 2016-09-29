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

    window.addEventListener('message', function windowReturnHandler(event){
      let tempCode = event.data;
      window.removeEventListener('message', windowReturnHandler);
      currentThis.props.actions.storeOAuthTempCode(tempCode);
      currentThis.getTokenFromCode();
    });

    authenticate();
  }

  getTokenFromCode(){
    GatekeeperApi.exchangeCodeForToken(this.props.oauths.oauthReturnedTempCode).then(result => {
      this.props.actions.storeOAuthToken(result);
      GithubAPI.addTokenToOcto(this.props.oauths.oauthReturnedToken);
    }).catch(error => {
      throw(error);
    });
  }

  render() {
    return (
      <button className="btn btn-success" onClick={this.handleOAuthClick}>Sign Into GitHub</button>
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
