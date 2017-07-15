import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';

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
    let isConfigsLoaded = false;

    if(this.props.configs){
      isConfigsLoaded = true;
    }

    if(isConfigsLoaded){
      if(this.context.location.pathname === this.props.configs.HOME_PAGE_URI){
        isHomepage = true;
      }
    }

    return (
      <div className="footer">
        {(isHomepage === true || isConfigsLoaded === false) ? "" :
          <button type="button" className="btn btn-link" onClick={this.redirectToPreviousPage}>Go Back</button>
        }
      </div>
    );
  }
}

Footer.propTypes = {
  configs: PropTypes.object
};

Footer.contextTypes = {
  location: PropTypes.object.isRequired
};

export default Footer;
