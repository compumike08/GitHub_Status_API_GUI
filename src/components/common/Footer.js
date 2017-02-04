import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {HOME_PAGE_URI} from '../../utils/constants';

class Footer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToPreviousPage = this.redirectToPreviousPage.bind(this);
  }

  redirectToPreviousPage(){
    const slashChar = "/";
    const curLocPath = this.context.location.pathname;

    let upOneLevelLocCharIndx = curLocPath.lastIndexOf(slashChar);
    let upOneLevelLocStr = curLocPath.slice(0, upOneLevelLocCharIndx);
    let upTwoLevelsLocCharIndx = upOneLevelLocStr.lastIndexOf(slashChar);
    let upTwoLevelsLocStr = upOneLevelLocStr.slice(0, upTwoLevelsLocCharIndx);

    browserHistory.push(upTwoLevelsLocStr);
  }

  render() {
    let isHomepage = false;

    if(this.context.location.pathname === HOME_PAGE_URI){
      isHomepage = true;
    }

    return (
      <div className="footer">
        {isHomepage === true ? "" :
          <button type="button" className="btn btn-link" onClick={this.redirectToPreviousPage}>Go Back</button>
        }
      </div>
    );
  }
}

Footer.contextTypes = {
  location: PropTypes.object
};

export default Footer;
