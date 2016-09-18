import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as CONSTANTS from '../../utils/constants';
import * as oauthActions from '../../actions/oauthActions';
import GatekeepApi from '../../api/gatekeeperAPI';

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
      console.log(tempCode);
      currentThis.props.actions.storeOAuthTempCode(tempCode);
      currentThis.getTokenFromCode();
    });

    authenticate();
  }

  getTokenFromCode(){
    GatekeepApi.exchangeCodeForToken(this.props.oauths.oauthReturnedTempCode).then(result => {
      console.log("TOKEN RESULT: " + result);
    }).catch(error => {
      throw(error);
    });
  }

  render() {
    return (
      <button onClick={this.handleOAuthClick}>Sign Into GitHub</button>
    );
  }
}

OAuthSignInButton.propTypes = {
  actions: PropTypes.object.isRequired
};

function authenticate(){
  let popup = window.open(CONSTANTS.OAUTH_AUTHORIZE_URL, CONSTANTS.OAUTH_PROVIDER_NAME, "width=500,height=800");
}

function mapStateToProps(state, ownProps) {
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
