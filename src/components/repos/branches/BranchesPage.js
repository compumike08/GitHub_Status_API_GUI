import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import BranchesList from './BranchesList';
import * as repoActions from '../../../actions/repoActions';

import toastr from 'toastr';

class BranchesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleBranchSelect = this.handleBranchSelect.bind(this);
  }

  componentWillMount(){
    if(!this.props.repo.id){
      toastr.error("ERROR: No repo found with matching id ");
      browserHistory.push("/");
    }else{
      this.props.actions.loadBranchesForRepo(this.props.repo.name);
    }
  }

  handleBranchSelect(evt){
    evt.preventDefault();
  }

  render() {
    const {repo} = this.props;

    return (
      <div className="panel panel-default">
        <div className="panel-heading">Branches In <span className="italic">{repo.name}</span></div>
        <div className="panel-body">
          <span className="bold">Select a branch:</span>
        </div>

        <BranchesList repoId={repo.id} branches={repo.branches} onSelect={this.handleBranchSelect}/>
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
