import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import LoadingNotice from '../../../common/LoadingNotice';
import CommitsList from './CommitsList';
import * as repoActions from '../../../../actions/repoActions';
import {getBranchByName, getRepoById, genIntegerSequence} from '../../../../utils/utilityMethods';
import InvalidPageError from '../../../../errors/InvalidPageError';

import toastr from 'toastr';

const FIRST_PAGE_NUM = 1;

class CommitsPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleViewCombinedStatusSelect = this.handleViewCombinedStatusSelect.bind(this);
    this.handleCommitSelect = this.handleCommitSelect.bind(this);
    this.handlePageSelect = this.handlePageSelect.bind(this);
    this.handleNextPageSelect = this.handleNextPageSelect.bind(this);
    this.handlePrevPageSelect = this.handlePrevPageSelect.bind(this);
    this.handleFirstPageSelect = this.handleFirstPageSelect.bind(this);
    this.handleLastPageSelect = this.handleLastPageSelect.bind(this);
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

  handlePageSelect(evt){
    evt.preventDefault();

    let selectedPageNum = evt.currentTarget.value;
    this.loadPagedData(selectedPageNum);
  }

  handleNextPageSelect(evt){
    evt.preventDefault();

    let currentPageNum = this.props.branch.commits.currentPageNum;
    let lastPageNum = this.props.branch.commits.totalNumPages;

    if(currentPageNum < lastPageNum){
      this.loadPagedData(currentPageNum + 1);
    }
  }

  handlePrevPageSelect(evt){
    evt.preventDefault();

    let currentPageNum = this.props.branch.commits.currentPageNum;

    if(currentPageNum > FIRST_PAGE_NUM){
      this.loadPagedData(currentPageNum - 1);
    }
  }

  handleFirstPageSelect(evt){
    evt.preventDefault();
    this.loadPagedData(FIRST_PAGE_NUM);
  }

  handleLastPageSelect(evt){
    evt.preventDefault();

    let lastPageNum = this.props.branch.commits.totalNumPages;
    this.loadPagedData(lastPageNum);
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
      let totalNumPages = branch.commits.totalNumPages;
      let currentPageNum = branch.commits.currentPageNum;
      let paginatedCommits = branch.commits.paginatedCommits;

      if(paginatedCommits !== null) {
        let pageNumsArray = [...genIntegerSequence(FIRST_PAGE_NUM, totalNumPages)];
        let pagesArray = pageNumsArray.map(pageNum => {
          let isFirstPage = pageNum == FIRST_PAGE_NUM;
          let isCurrentPage = pageNum == currentPageNum;
          let isLastPage = pageNum == totalNumPages;

          return {
            pageNum: pageNum,
            isFirstPage: isFirstPage,
            isCurrentPage: isCurrentPage,
            isLastPage: isLastPage
          };
        });

        commitsListElement = (
          <div className="panel-body">
            <span className="bold">Select a commit:</span>

            {totalNumPages > FIRST_PAGE_NUM &&
              <nav aria-label="Commits navigation">
                <ul className="pagination">
                  {currentPageNum > FIRST_PAGE_NUM &&
                  <li onClick={this.handleFirstPageSelect}>
                        <span aria-label="First">
                          <span aria-hidden="true">First</span>
                        </span>
                  </li>
                  }

                  {currentPageNum > FIRST_PAGE_NUM &&
                  <li onClick={this.handlePrevPageSelect}>
                      <span aria-label="Previous">
                        <span aria-hidden="true">&lsaquo;</span>
                      </span>
                  </li>
                  }

                  {pagesArray.map(pageObj =>
                    <li key={pageObj.pageNum}
                        value={pageObj.pageNum}
                        onClick={pageObj.isCurrentPage === false ? this.handlePageSelect : ""}
                        className={pageObj.isCurrentPage === true ? "active" : ""}>
                      <span>{pageObj.pageNum}</span>
                    </li>
                  )}

                  {currentPageNum < totalNumPages &&
                  <li onClick={this.handleNextPageSelect}>
                      <span aria-label="Next">
                        <span aria-hidden="true">&rsaquo;</span>
                      </span>
                  </li>
                  }

                  {currentPageNum < totalNumPages &&
                  <li onClick={this.handleLastPageSelect}>
                      <span aria-label="Last">
                        <span aria-hidden="true">Last</span>
                      </span>
                  </li>
                  }
                </ul>
              </nav>
            }

            <CommitsList repoId={repo.id} repoName={repo.name} branchName={branch.name}
                         commits={paginatedCommits} onSelect={this.handleCommitSelect}/>
          </div>
        );
      }
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
