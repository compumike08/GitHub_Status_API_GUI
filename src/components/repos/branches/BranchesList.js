import React, {PropTypes} from 'react';
import BranchesListRow from './BranchesListRow';

const BranchesList = ({repoId, branches, onSelect}) => {
  return (
    <div className="list-group">
      {branches.map(branch =>
        <BranchesListRow key={branch.name} repoId={repoId} branch={branch} onSelect={onSelect} />
      )}
    </div>
  );
};

BranchesList.propTypes = {
  repoId: PropTypes.number.isRequired,
  branches: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default BranchesList;
