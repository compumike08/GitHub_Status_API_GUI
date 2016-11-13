import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BranchesList from './BranchesList';
import * as repoActions from '../../../actions/repoActions';
import GithubAPI from '../../../api/githubAPI';

import toastr from 'toastr';

class BranchesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleBranchSelect = this.handleBranchSelect.bind(this);
  }

  componentWillMount(){
    const {repo} = this.props;

    if(!repo.id){
      toastr.error("ERROR: No repo found with matching id ");
      browserHistory.push("/");
    }else{
      this.props.actions.loadBranchesForRepo(repo.name).then(() => {
        toastr.success("Branch list for repo '" + repo.name + "' fetched successfully!");
      }).catch(error => {
        console.log(error);
        toastr.error("Branch list for repo '" + repo.name + "' fetch failed!");
      });
    }
  }

  handleBranchSelect(evt){
    evt.preventDefault();
    const {repo} = this.props;
    let selectedBranchName = evt.currentTarget.value;

    GithubAPI.getCommitsOnBranch("compumike08", repo.name, selectedBranchName).then(commits => {
      console.log(commits);
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    const {repo} = this.props;

    let branchesListElement = (
      <div className="panel-body">
        <span className="bold italic">Loading...</span>
      </div>
    );

    if(repo.branches !== null){
      branchesListElement = (
        <div className="panel-body">
          <span className="bold">Select a branch:</span>
          <BranchesList repoId={repo.id} branches={repo.branches} onSelect={this.handleBranchSelect}/>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="panel panel-default">
            <div className="panel-heading">Branches In <span className="italic">{repo.name}</span></div>
            {branchesListElement}
          </div>
        </div>
      </div>
    );
  }
}

BranchesPage.propTypes = {
  repo: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function getRepoById(repos, id){
  const repo = repos.find(repo => repo.id == id);

  if (repo){
    return repo;
  }else{
    return {};
  }
}

function mapStateToProps(state, ownProps) {
  const repoId = ownProps.params.id;  // from the path '/repobranches/:id'

  let repo = {};

  if (repoId && state.repos.length > 0){
    repo = getRepoById(state.repos, repoId);
  }

  return {
    repo: repo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(repoActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BranchesPage);
