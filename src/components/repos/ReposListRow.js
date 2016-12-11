import React, {PropTypes} from 'react';

const ReposListRow = ({repo, onSelect}) => {
    return (
      <div className="list-group-item">
        <div className="row">
          <div className="col-lg-1 col-sm-2">
            <div className="btn-group" role="group">
              <button type="button" className="btn btn-success" value={repo.id} onClick={onSelect}>
                View
              </button>
            </div>
          </div>

          <div className="col-lg-9 col-sm-10">
            <span>{repo.name}</span>
          </div>
        </div>
      </div>
    );
};

ReposListRow.propTypes = {
  repo: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default ReposListRow;
