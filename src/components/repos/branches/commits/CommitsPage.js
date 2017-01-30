import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import LoadingNotice from '../../../common/LoadingNotice';
import CommitsList from './CommitsList';
import * as repoActions from '../../../../actions/repoActions';
import {getBranchByName, getRepoById} from '../../../../utils/utilityMethods';

import toastr from 'toastr';

class CommitsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleViewCombinedStatusSelect = this.handleViewCombinedStatusSelect.bind(this);
    this.handleCommitSelect = this.handleCommitSelect.bind(this);
  }

  componentWillMount(){
    const {repo} = this.props;
    const {branch} = this.props;

    if(!repo.id){
      toastr.error("ERROR: No repo found with matching id");
      browserHistory.push("/");
    }else{
      if(!branch.name){
        toastr.error("ERROR: No branch found with matching branch name");
        browserHistory.push("/");
      }else{
        this.props.repoActions.loadCommitsForBranch(branch.name, repo.name).then(() => {
          toastr.success("Commit list for branch '" + branch.name + "' in repo '" + repo.name + "' fetched successfully!");
        }).catch(error => {
          console.log(error);
          toastr.error("Commit list for branch '" + branch.name + "' in repo '" + repo.name + "' fetch failed!");
        });
      }
    }
  }

  handleViewCombinedStatusSelect(evt){
    evt.persist();
    evt.preventDefault();

    let repoId = this.props.repo.id;
    let branchName = this.props.branch.name;

    browserHistory.push("/repo/" + repoId + "/branch/" + branchName + "/combinedStatus");
  }

  handleCommitSelect(evt){
    evt.persist();
    evt.preventDefault();

    let repoId = evt.target.attributes.getNamedItem("data-repo-id").value;
    let branchName = evt.target.attributes.getNamedItem("data-branch-name").value;
    let commitSha = evt.target.value;

    browserHistory.push("/repo/" + repoId + "/branch/" + branchName + "/commit/" + commitSha + "/statuses");
  }

  render() {
    const {repo} = this.props;
    const {branch} = this.props;

    let commitsListElement = (
      <LoadingNotice/>
    );

    if(branch.commits !== null){
      commitsListElement = (
        <div className="panel-body">
          <span className="bold">Select a commit:</span>
          <CommitsList repoId={repo.id} repoName={repo.name} branchName={branch.name} commits={branch.commits} onSelect={this.handleCommitSelect}/>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          <div className="col-sm-3">
            <button className="btn btn-info" onClick={this.handleViewCombinedStatusSelect}>View Combined Status For <span className="italic">{branch.name}</span> Branch</button>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">Commits On <span className="italic">{branch.name}</span> In <span className="italic">{repo.name}</span></div>
              {commitsListElement}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommitsPage.propTypes = {
  repo: PropTypes.object.isRequired,
  branch: PropTypes.object.isRequired,
  repoActions: PropTypes.object.isRequired
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
    branch: branch
  };
}

function mapDispatchToProps(dispatch) {
  return {
    repoActions: bindActionCreators(repoActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommitsPage);
