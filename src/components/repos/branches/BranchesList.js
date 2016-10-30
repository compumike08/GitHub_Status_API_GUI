import React, {PropTypes} from 'react';

const BranchesList = ({repo, branches, onSelect}) => {
  return (
    <div className="list-group">
      <button className="list-group-item">Placeholder Branch Name 1</button>
      <button className="list-group-item">Placeholder Branch Name 2</button>
      <button className="list-group-item">Placeholder Branch Name 3</button>
    </div>
  );
};

BranchesList.propTypes = {
  repo: PropTypes.object.isRequired,
  branches: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default BranchesList;
