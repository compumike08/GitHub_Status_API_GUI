import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import LoadingNotice from '../../../../common/LoadingNotice';
import * as currentStatusesActions from '../../../../../actions/currentStatusesActions';
import {getRepoById, firstSevenOfSha} from '../../../../../utils/utilityMethods';
import CurrentStatusesList from './CurrentStatusesList';

import toastr from 'toastr';

class CurrentStatusesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleCreateStatus = this.handleCreateStatus.bind(this);
  }

  componentWillMount(){
    const repoId = this.props.repoId;
    const repoName = this.props.repoName;
    const branchName = this.props.branchName;
    const commitSha = this.props.commitSha;

    this.props.currentStatusesActions.loadStatusesForCurrentCommit(repoId, true, branchName, commitSha).then(() => {
      toastr.success("Statuses loaded for current commit '" + firstSevenOfSha(commitSha) + "'!");
    }).catch(error => {
      console.log(error);
      toastr.error("Statuses for current commit '" + firstSevenOfSha(commitSha) + "' on branch '" + branchName + "' in repo '" + repoName + "' fetch failed!");
    });
  }

  handleCreateStatus(evt) {
    evt.preventDefault();

    const repoId = this.props.repoId;
    const branchName = this.props.branchName;
    const commitSha = this.props.commitSha;

    browserHistory.push("/repo/" + repoId + "/branch/" + branchName + "/commit/" + commitSha + "/status");
  }

  render() {
    const {currentCommitStatusesData} = this.props;
    const {repoName} = this.props;

    let commitShaShort = null;

    let statusesListElement = (
      <LoadingNotice/>
    );

    if ((currentCommitStatusesData.commitSha !== null) && (currentCommitStatusesData.commitSha !== undefined)) {
      commitShaShort = firstSevenOfSha(currentCommitStatusesData.commitSha);
      statusesListElement = (
        <CurrentStatusesList repoId={currentCommitStatusesData.repoId.toString()}
                             isFromBranch={currentCommitStatusesData.isFromBranch}
                             branchName={currentCommitStatusesData.branchName}
                             commitSha={currentCommitStatusesData.commitSha}
                             statuses={currentCommitStatusesData.statuses} />
      );
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <button type="button" className="btn btn-primary" onClick={this.handleCreateStatus}>Create New Status</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">Current Statuses For Commit <span className="italic">{commitShaShort}</span> On Branch <span className="italic">{currentCommitStatusesData.branchName}</span> In Repo <span className="italic">{repoName}</span></div>
              {statusesListElement}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CurrentStatusesPage.propTypes = {
  repoId: PropTypes.string.isRequired,
  repoName: PropTypes.string.isRequired,
  branchName: PropTypes.string.isRequired,
  commitSha: PropTypes.string.isRequired,
  currentCommitStatusesData: PropTypes.object.isRequired,
  currentStatusesActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const repoId = ownProps.params.repoId.toString();
  const branchName = ownProps.params.branchName;
  const commitSha = ownProps.params.commitSha;

  const {currentCommitStatusesData} = state;
  const {repos} = state;

  let repo = {};

  if (repoId && repos.length > 0){
    repo = getRepoById(repos, repoId);
  }

  return {
    repoId: repoId,
    repoName: repo.name,
    branchName: branchName,
    commitSha: commitSha,
    currentCommitStatusesData: currentCommitStatusesData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    currentStatusesActions: bindActionCreators(currentStatusesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentStatusesPage);
