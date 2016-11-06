import React, {PropTypes} from 'react';

const BranchesListRow = ({repoId, branch, onSelect}) => {
  return (
    <button className="list-group-item" data-repo-id={repoId} onClick={onSelect}>{branch.name}</button>
  );
};

BranchesListRow.propTypes = {
  repoId: PropTypes.number.isRequired,
  branch: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default BranchesListRow;
