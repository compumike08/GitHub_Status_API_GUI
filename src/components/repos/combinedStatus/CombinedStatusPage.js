import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import * as combinedStatusActions from '../../../actions/combinedStatusActions';
import {getBranchByName, getRepoById} from '../../../utils/utilityMethods';
import {PANEL_CONTENT_TYPE_CLASS} from "../../../constants/constants";
import LoadingNotice from '../../common/LoadingNotice';
import StatusStateLabel from "../../common/StatusStateLabel";

import toastr from 'toastr';

class CombinedStatusPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount(){
    const {repo} = this.props;
    const {branch} = this.props;
    const {actions} = this.props;

    if((!repo.id) || (!branch.name)) {
      console.log("Unable to display combined status because repo.id and/or branch.name values from props were null or undefined");
      toastr.error("Unable to display combined status.");
      browserHistory.push("/");
    } else {
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
      <LoadingNotice panelContentType={PANEL_CONTENT_TYPE_CLASS.HEADING}/>
    );

    if (combinedStatusData.combinedStatus !== null) {
      combinedStatusDataElement = (
        <div className="panel-heading">
          Combined Status: <StatusStateLabel spanModeOn={true} statusState={combinedStatusData.combinedStatus.state}/>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
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
    actions: bindActionCreators(combinedStatusActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CombinedStatusPage);
