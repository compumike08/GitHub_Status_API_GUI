import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
//import {browserHistory} from 'react-router';
import LoadingNotice from '../../common/LoadingNotice';
//import * as currentStatusActions from '../../../actions/currentStatusActions';
import {getRepoById, firstSevenOfSha} from '../../../utils/utilityMethods';
import CurrentStatusesList from './CurrentStatusesList';

class CurrentStatusesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    //Bind component class functions to this context
    /* Example:
     this.functionName = this.functionName.bind(this);
     */
  }

  render() {
    let {currentCommitStatuesData} = this.props;
    let {currentCommitStatusRepoName} = this.props;

    let commitShaShort = null;

    let statusesListElement = (
      <LoadingNotice/>
    );

    if ((currentCommitStatuesData.commit !== null) && (currentCommitStatuesData.commit !== undefined)) {
      commitShaShort = firstSevenOfSha(currentCommitStatuesData.commit);
      statusesListElement = (
        <CurrentStatusesList repoId={currentCommitStatuesData.repoId}
                             isFromBranch={currentCommitStatuesData.isFromBranch}
                             branchName={currentCommitStatuesData.branchName}
                             commitSha={currentCommitStatuesData.commit}
                             statuses={currentCommitStatuesData.statuses} />
      );
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">Current Statuses For Commit <span className="italic">{commitShaShort}</span> On Branch <span className="italic">{currentCommitStatuesData.branchName}</span> In Repo <span className="italic">{currentCommitStatusRepoName}</span></div>
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
  currentCommitStatuesData: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  let currentCommitStatusRepoName = null;

  if (state.repos !== null){
    let currentCommitStatusRepo = getRepoById(state.repos, state.currentCommitStatuesData.repoId);

    if ((currentCommitStatusRepo.name !== null) && (currentCommitStatusRepo.name !== undefined)){
      currentCommitStatusRepoName = currentCommitStatusRepo.name;
    }
  }

  return {
    currentCommitStatusRepoName: currentCommitStatusRepoName,
    currentCommitStatuesData: state.currentCommitStatuesData
  };
}

export default connect(mapStateToProps)(CurrentStatusesPage);
