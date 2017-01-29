import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import LoadingNotice from '../../common/LoadingNotice';
import {getRepoById, firstSevenOfSha} from '../../../utils/utilityMethods';
import CurrentStatusesList from './CurrentStatusesList';

class CurrentStatusesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleCreateStatus = this.handleCreateStatus.bind(this);
  }

  handleCreateStatus(evt) {
    evt.preventDefault();

    let {currentCommitStatusesData} = this.props;

    let repoId = currentCommitStatusesData.repoId;
    let branchName = currentCommitStatusesData.branchName;
    let commitSha = currentCommitStatusesData.commit;

    browserHistory.push("/createStatus/repo/" + repoId + "/branch/" + branchName + "/sha/" + commitSha);
  }

  render() {
    let {currentCommitStatusesData} = this.props;
    let {currentCommitStatusRepoName} = this.props;

    let commitShaShort = null;

    let statusesListElement = (
      <LoadingNotice/>
    );

    if ((currentCommitStatusesData.commit !== null) && (currentCommitStatusesData.commit !== undefined)) {
      commitShaShort = firstSevenOfSha(currentCommitStatusesData.commit);
      statusesListElement = (
        <CurrentStatusesList repoId={currentCommitStatusesData.repoId}
                             isFromBranch={currentCommitStatusesData.isFromBranch}
                             branchName={currentCommitStatusesData.branchName}
                             commitSha={currentCommitStatusesData.commit}
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
              <div className="panel-heading">Current Statuses For Commit <span className="italic">{commitShaShort}</span> On Branch <span className="italic">{currentCommitStatusesData.branchName}</span> In Repo <span className="italic">{currentCommitStatusRepoName}</span></div>
              {statusesListElement}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CurrentStatusesPage.propTypes = {
  currentCommitStatusRepoName: PropTypes.string,
  currentCommitStatusesData: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  let currentCommitStatusRepoName = null;

  if (state.repos !== null){
    let currentCommitStatusRepo = getRepoById(state.repos, state.currentCommitStatusesData.repoId);

    if ((currentCommitStatusRepo.name !== null) && (currentCommitStatusRepo.name !== undefined)){
      currentCommitStatusRepoName = currentCommitStatusRepo.name;
    }
  }

  return {
    currentCommitStatusRepoName: currentCommitStatusRepoName,
    currentCommitStatusesData: state.currentCommitStatusesData
  };
}

export default connect(mapStateToProps)(CurrentStatusesPage);
