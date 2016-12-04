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
        this.props.actions.loadCommitsForBranch(branch.name, repo.name).then(() => {
          toastr.success("Commit list for branch '" + branch.name + "' in repo '" + repo.name + "' fetched successfully!");
        }).catch(error => {
          console.log(error);
          toastr.error("Commit list for branch '" + branch.name + "' in repo '" + repo.name + "' fetch failed!");
        });
      }
    }
  }

  handleCommitSelect(evt){
    evt.preventDefault();
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
          <CommitsList repoId={repo.id} branchName={branch.name} commits={branch.commits} onSelect={this.handleCommitSelect}/>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="panel panel-default">
            <div className="panel-heading">Commits On <span className="italic">{branch.name}</span> In <span className="italic">{repo.name}</span></div>
            {commitsListElement}
          </div>
        </div>
      </div>
    );
  }
}

CommitsPage.propTypes = {
  repo: PropTypes.object.isRequired,
  branch: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const repoId = ownProps.params.id;  // from the path '/repobranches/:id'
  const branchName = ownProps.params.branchName;  // from the path '/repobranches/:id/commits/:branchName'

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
    actions: bindActionCreators(repoActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommitsPage);
