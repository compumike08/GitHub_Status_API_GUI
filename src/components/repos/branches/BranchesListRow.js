import React, {PropTypes} from 'react';

const BranchesListRow = ({repoId, branch, onSelect}) => {
  return (
  <div className="list-group-item">
    <div className="row">
      <div className="col-lg-1 col-sm-2">
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-success" data-repo-id={repoId} value={branch.name} onClick={onSelect}>
            View
          </button>
        </div>
      </div>

      <div className="col-lg-9 col-sm-10">
        <span>{branch.name}</span>
      </div>
    </div>
  </div>
  );
};

BranchesListRow.propTypes = {
  repoId: PropTypes.number.isRequired,
  branch: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default BranchesListRow;
