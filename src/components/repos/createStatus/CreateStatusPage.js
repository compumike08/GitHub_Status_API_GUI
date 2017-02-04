import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import * as currentStatusesActions from '../../../actions/currentStatusesActions';
import CreateStatusForm from './CreateStatusForm';
import ErrorNotice from '../../common/ErrorNotice';

import {getRepoById,
        getBranchByName,
        findCommitBySha,
        firstSevenOfSha,
        validateObjectExists} from '../../../utils/utilityMethods';

import toastr from 'toastr';

import {GITHUB_STATUS_STATES} from '../../../utils/constants';

class CreateStatusPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      newStatus: {
        repoId: props.repo.id,
        branchName: props.branch.name,
        commitSha: props.commit.sha,
        state: GITHUB_STATUS_STATES.PENDING,
        description: "",
        targetUrl: ""
      }
    };

    //Bind component class functions to this context
    this.updateStatusState = this.updateStatusState.bind(this);
    this.createNewStatus = this.createNewStatus.bind(this);
  }

  updateStatusState(evt){
    const field = evt.target.name;
    let newStatus = this.state.newStatus;
    newStatus[field] = evt.target.value;
    return this.setState({newStatus: newStatus});
  }

  createNewStatus(evt){
    evt.preventDefault();
    const newStatus = this.state.newStatus;

    this.props.currentStatusesActions.createNewStatusForCommit(newStatus.repoId, newStatus.commitSha, newStatus.state, newStatus.description, newStatus.targetUrl)
      .then(() => {
        toastr.success("New '" + newStatus.state + "' status for commit '" + firstSevenOfSha(newStatus.commitSha) + "' created successfully!");
        browserHistory.push("/repo/" + newStatus.repoId +"/branch/" + newStatus.branchName + "/commit/" + newStatus.commitSha + "/statuses");
      })
      .catch(error => {
        console.log(error);
        toastr.error("Failed to create new '" + newStatus.state + "' status for commit '" + firstSevenOfSha(newStatus.commitSha) + "!");
      });
  }

  render() {
    const {repo} = this.props;
    const {branch} = this.props;
    const {commit} = this.props;

    let commitShaShort = null;

    let createStatusFormElement = (
      <ErrorNotice/>
    );

    firstSevenOfSha(commit.sha);

    if(validateObjectExists(repo)){
      if(validateObjectExists(branch)){
        if(validateObjectExists(commit)){
          commitShaShort = firstSevenOfSha(commit.sha);
          createStatusFormElement = (
            <CreateStatusForm newStatus={this.state.newStatus} onSubmit={this.createNewStatus} onChange={this.updateStatusState} />
          );
        }
      }
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                Create Status For <span className="italic">{commitShaShort}</span> In <span className="italic">{repo.name}</span> On <span className="italic">{branch.name}</span>
              </div>
              <div className="panel-body">
                {createStatusFormElement}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateStatusPage.propTypes = {
  repo: PropTypes.object.isRequired,
  branch: PropTypes.object.isRequired,
  commit: PropTypes.object.isRequired,
  currentStatusesActions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let repoId = ownProps.params.repoId;
  let commitSha = ownProps.params.commitSha;
  let branchName = ownProps.params.branchName;

  let repo = null;
  let branch = null;
  let commit = null;

  if (repoId && state.repos.length > 0) {
    repo = getRepoById(state.repos, repoId);

    if (branchName && repo.branches.length > 0) {
      branch = getBranchByName(repo.branches, branchName);

      if (commitSha && branch.commits.length > 0) {
        commit = findCommitBySha(branch.commits, commitSha);
      } else {
        toastr.error("Invalid commitSha or empty branch.commits array.");
      }
    } else {
      toastr.error("Invalid branchName or empty repo.branches array.");
    }
  } else {
    toastr.error("Invalid repoId or empty repos array.");
  }

  return {
    repo: repo,
    branch: branch,
    commit: commit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    currentStatusesActions: bindActionCreators(currentStatusesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStatusPage);
