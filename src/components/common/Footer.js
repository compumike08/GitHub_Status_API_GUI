import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {HOME_PAGE_URI} from '../../utils/constants';

class Footer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let isHomepage = false;

    if(this.context.location.pathname === HOME_PAGE_URI){
      isHomepage = true;
    }

    return (
      <div className="footer">
        {isHomepage === true ? "" :
          <Link className="btn btn-link" to={HOME_PAGE_URI}>Go Back</Link>
        }
      </div>
    );
  }
}

Footer.contextTypes = {
  location: PropTypes.object
};

export default Footer;
