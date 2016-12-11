import React, {PropTypes} from 'react';
import {firstSevenOfSha} from '../../../../utils/utilityMethods';

const CommitsListRow = ({repoId, repoName, branchName, commit, onSelect}) => {
  let shortSha = firstSevenOfSha(commit.sha);

  return (
  <div className="list-group-item">
    <div className="row">
      <div className="col-lg-1 col-sm-2">
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-success" data-repo-id={repoId} data-repo-name={repoName} data-branch-name={branchName} value={commit.sha} onClick={onSelect}>
            View
          </button>
        </div>
      </div>

      <div className="col-lg-9 col-sm-10">
        <span>{shortSha}</span>
      </div>
    </div>
  </div>
  );
};

CommitsListRow.propTypes = {
  repoId: PropTypes.number.isRequired,
  repoName: PropTypes.string.isRequired,
  branchName: PropTypes.string.isRequired,
  commit: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CommitsListRow;
