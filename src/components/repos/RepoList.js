import React, {PropTypes} from 'react';

const RepoList = ({repos, onSelect}) => {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Repositories</div>
        <div className="panel-body">
          <span className="bold">Select a repository:</span>
        </div>

        <div className="list-group">
          <a href="#" className="list-group-item" onClick={onSelect}>Get Current User Repos</a>
        </div>
      </div>
    );
};

RepoList.propTypes = {
    //property: PropTypes.type[.isRequired]
  repos: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default RepoList;
