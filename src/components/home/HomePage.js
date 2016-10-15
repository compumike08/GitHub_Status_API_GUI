import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import OAuthSignInButton from '../oauth/OAuthSignInButton';
import RepoList from '../repos/RepoList';
import * as repoActions from '../../actions/repoActions';

import toastr from 'toastr';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleGetUserRepos = this.handleGetUserRepos.bind(this);
  }

  handleGetUserRepos(evt){
    evt.preventDefault();

    let repos = this.props.repos;

    let selectedRepoId = evt.currentTarget.value;
    let selectedRepo = repos.find(repo => repo.id == selectedRepoId);

    toastr.info("You selected: " + selectedRepo.name);
  }

  render() {
    const {repos} = this.props;

      return (
        <div>
          <h1>GitHub Status API GUI</h1>

          <div className="row">
            <div className="col-sm-3">
              <OAuthSignInButton/>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <RepoList repos={repos} onSelect={this.handleGetUserRepos}/>
            </div>
          </div>

        </div>
      );
  }
}

HomePage.propTypes = {
  repos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state){
  return {
    repos: state.repos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(repoActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
