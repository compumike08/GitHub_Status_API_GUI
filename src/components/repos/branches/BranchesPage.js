import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BranchesList from './BranchesList';
import LoadingNotice from '../../common/LoadingNotice';
import * as repoActions from '../../../actions/repoActions';
import {getRepoById} from '../../../utils/utilityMethods';

import toastr from 'toastr';

class BranchesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleBranchSelect = this.handleBranchSelect.bind(this);
    this.redirectToCommitsListPage = this.redirectToCommitsListPage.bind(this);
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
    this.redirectToCommitsListPage(evt.currentTarget.value);
  }

  redirectToCommitsListPage(selectedBranchName){
    let branches = this.props.repo.branches;
    let selectedBranch = branches.find(branch => branch.name == selectedBranchName);

    browserHistory.push("/repobranches/" + this.props.repo.id + "/commits/" + selectedBranch.name);
  }

  render() {
    const {repo} = this.props;

    let branchesListElement = (
      <LoadingNotice/>
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
      <div>
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">Branches In <span className="italic">{repo.name}</span></div>
              {branchesListElement}
            </div>
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
