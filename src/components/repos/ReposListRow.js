import React, {PropTypes} from 'react';

const ReposListRow = ({repo, onSelect}) => {
    return (
      <button className="list-group-item" value={repo.id} onClick={onSelect}>{repo.name}</button>
    );
};

ReposListRow.propTypes = {
  repo: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default ReposListRow;
