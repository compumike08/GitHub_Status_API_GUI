import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import * as statusActions from '../../../actions/statusActions';
import {getBranchByName, getRepoById} from '../../../utils/utilityMethods';
import LoadingNotice from '../../common/LoadingNotice';

import toastr from 'toastr';

class CombinedStatusPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    //Bind component class functions to this context
    /* Example:
     this.functionName = this.functionName.bind(this);
     */
  }

  componentWillMount(){
    const {repo} = this.props;
    const {branch} = this.props;
    const {actions} = this.props;

    if((!repo.id) || (!branch.name)) {
      // TODO: Remove console.log statements below.
      console.log("repoId and/or branchName was null.");
      console.log("repoId: " + repo.id);
      console.log("branchName: " + branch.name);
      toastr.error("Unable to display combined status.");
      browserHistory.push("/");
    }else{
      actions.loadCombinedStatusForBranch(repo.id, branch.name).then(() => {
        toastr.success("Combined status fetched successfully for '" + branch.name + "' branch in '" + repo.name + "' repo!");
      }).catch(error => {
        console.log(error);
        toastr.error("Combined status fetch failed for '" + branch.name + "' branch in '" + repo.name + "' repo!");
      });
    }
  }

  render() {
    const {combinedStatusData} = this.props;

    let combinedStatusDataElement = (
      <LoadingNotice/>
    );

    if(combinedStatusData.combinedStatus !== null){
      combinedStatusDataElement = (
        <div className="panel-body">
          <div>
            <span className="bold">Combined Status State: </span><span className="italic">{combinedStatusData.combinedStatus.state}</span>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">Combined Status</div>
              {combinedStatusDataElement}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CombinedStatusPage.propTypes = {
  repo: PropTypes.object.isRequired,
  branch: PropTypes.object.isRequired,
  combinedStatusData: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const repoId = ownProps.params.repoId;
  const branchName = ownProps.params.branchName;

  let repo = {};
  let branch = {};

  if (repoId && state.repos.length > 0){
    repo = getRepoById(state.repos, repoId);
  }

  if (branchName && repo.branches.length > 0){
    branch = getBranchByName(repo.branches, branchName);
  }

  return {
    repo: repo,
    branch: branch,
    combinedStatusData: state.combinedStatusData
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(statusActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CombinedStatusPage);
