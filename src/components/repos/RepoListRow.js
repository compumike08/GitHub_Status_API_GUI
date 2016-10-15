import React, {PropTypes} from 'react';

const RepoListRow = ({repo, onSelect}) => {
    return (
      <button className="list-group-item" value={repo.id} onClick={onSelect}>{repo.name}</button>
    );
};

RepoListRow.propTypes = {
  repo: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default RepoListRow;
