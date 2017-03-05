import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import LoadingNotice from '../../../common/LoadingNotice';
import CommitsList from './CommitsList';
import * as repoActions from '../../../../actions/repoActions';
import {getBranchByName, getRepoById} from '../../../../utils/utilityMethods';
import InvalidPageError from '../../../../errors/InvalidPageError';

import toastr from 'toastr';

const FIRST_PAGE_NUM = 1;

class CommitsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleViewCombinedStatusSelect = this.handleViewCombinedStatusSelect.bind(this);
    this.handleCommitSelect = this.handleCommitSelect.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.loadPagedData = this.loadPagedData.bind(this);
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
        this.loadPagedData(FIRST_PAGE_NUM);
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

  handleNextPage(evt){
    evt.persist();
    evt.preventDefault();

    let currentPageNum = this.props.branch.commits.currentPageNum;

    this.loadPagedData(currentPageNum + 1);
  }

  loadPagedData(pageNum){
    const repoName = this.props.repo.name;
    const branchName = this.props.branch.name;

    this.props.repoActions.loadCommitsForBranch(branchName, repoName, pageNum).then(() => {
      let currentPageNum = this.props.branch.commits.currentPageNum;
      toastr.success("Loaded page of commits. (Page " + currentPageNum + " of " + this.props.branch.commits.totalNumPages + ")");
    }).catch(error => {
      let currentPageNum = 0;
      let totalNumPages = 0;
      let branchCommitsObj = this.props.branch.commits;

      if(branchCommitsObj){
        let tempCurPageNum = branchCommitsObj.currentPageNum;
        let tempTotalNumPages = branchCommitsObj.totalNumPages;

        if(tempCurPageNum){
          currentPageNum = tempCurPageNum;
        }

        if(tempTotalNumPages){
          totalNumPages = tempTotalNumPages;
        }

      }

      if(error instanceof InvalidPageError){
        // TODO: Once a better error logger has been implemented, change the following console.log statement outputs to only display when logging is set to DEBUG
        console.log("InvalidPageError message: " + error.message);
        console.log("Attempted To Request Page Number: " + pageNum);
        console.log("Total Number Of Paginated Pages Available: " + totalNumPages);
        console.log("Current Page Number: " + currentPageNum);

        toastr.error("The page of data you requested is not valid.");
      }else {
        console.log(error);
        toastr.error("ERROR: Unable to load page of commits. (Page " + currentPageNum + " of " + totalNumPages + ")");
      }
    });
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
          <CommitsList repoId={repo.id} repoName={repo.name} branchName={branch.name} commits={branch.commits.paginatedCommits} onSelect={this.handleCommitSelect}/>
          <button type="button" className="btn btn-default" onClick={this.handleNextPage} >Next Page</button>
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
