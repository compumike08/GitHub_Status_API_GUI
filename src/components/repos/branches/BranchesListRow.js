import React, {PropTypes} from 'react';

const BranchesListRow = ({repoId, branch, onSelect}) => {
  return (
    <button type="button" className="list-group-item" data-repo-id={repoId} value={branch.name} onClick={onSelect}>{branch.name}</button>
  );
};

BranchesListRow.propTypes = {
  repoId: PropTypes.number.isRequired,
  branch: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default BranchesListRow;
