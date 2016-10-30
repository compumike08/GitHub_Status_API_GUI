import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import toastr from 'toastr';

class BranchesList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      repo: Object.assign({}, props.repo)
    };

    //Bind component class functions to this context
    /* Example:
     this.functionName = this.functionName.bind(this);
     */
  }

  componentWillMount(){
    if(!this.props.repo.id){
      toastr.error("ERROR: No repo found with matching id ");
      browserHistory.push("/");
    }
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Branches In <span className="italic">{this.state.repo.name}</span></div>
        <div className="panel-body">
          <span className="bold">Select a branch:</span>
        </div>

        <div className="list-group">
          <button className="list-group-item">Placeholder Branch Name 1</button>
          <button className="list-group-item">Placeholder Branch Name 2</button>
          <button className="list-group-item">Placeholder Branch Name 3</button>
        </div>
      </div>
    );
  }
}

BranchesList.propTypes = {
  repo: PropTypes.object.isRequired
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
    //actions: bindActionCreators(actions_object, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BranchesList);
