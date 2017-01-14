import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
//import {browserHistory} from 'react-router';
import LoadingNotice from '../../common/LoadingNotice';
//import * as currentStatusActions from '../../../actions/currentStatusActions';
//import {getBranchByName, getRepoById, firstSevenOfSha} from '../../../utils/utilityMethods';
import CurrentStatusListRow from './CurrentStatusListRow';

class CurrentStatusPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    //Bind component class functions to this context
    /* Example:
     this.functionName = this.functionName.bind(this);
     */
  }

  render() {
    let statusesListElement = (
      <LoadingNotice/>
    );

    statusesListElement = (
      <CurrentStatusListRow/>
    );

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">Current Status For Commit <span className="italic">...</span></div>
              {statusesListElement}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CurrentStatusPage.propTypes = {
  //property: PropTypes.type[.isRequired]
};

function mapStateToProps(state, ownProps) {
  return {
    //property: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //actions: bindActionCreators(actions_object, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentStatusPage);
