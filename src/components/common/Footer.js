import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {HOME_PAGE_URI} from '../../utils/constants';

class Footer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToPreviousPage = this.redirectToPreviousPage.bind(this);
  }

  redirectToPreviousPage(){
    browserHistory.goBack();
  }

  render() {
    let isHomepage = false;

    if(this.context.location.pathname === HOME_PAGE_URI){
      isHomepage = true;
    }

    return (
      <div className="footer">
        {isHomepage === true ? "" :
          <span className="btn btn-link" onClick={this.redirectToPreviousPage}>Go Back</span>
        }
      </div>
    );
  }
}

Footer.contextTypes = {
  location: PropTypes.object
};

export default Footer;
