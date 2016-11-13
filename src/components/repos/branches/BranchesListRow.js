import React, {PropTypes} from 'react';

const BranchesListRow = ({repoId, branch, onSelect}) => {
  return (
    <button type="button" className="list-group-item" data-repo-id={repoId} value={branch} onClick={onSelect}>{branch}</button>
  );
};

BranchesListRow.propTypes = {
  repoId: PropTypes.number.isRequired,
  branch: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default BranchesListRow;
