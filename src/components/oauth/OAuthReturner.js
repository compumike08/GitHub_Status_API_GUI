import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class OAuthReturner extends React.Component {
  constructor(props, context) {
    super(props, context);

    //Bind component class functions to this context
    /* Example:
     this.functionName = this.functionName.bind(this);
     */
  }

  componentDidMount(){
    let code = window.location.toString().replace(/.+code=/, '');
    window.opener.postMessage(code, window.location);
    window.close();
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default OAuthReturner;
