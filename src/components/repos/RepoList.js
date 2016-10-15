import React, {PropTypes} from 'react';
import RepoListRow from './RepoListRow';

const RepoList = ({repos, onSelect}) => {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Repositories</div>
        <div className="panel-body">
          <span className="bold">Select a repository:</span>
        </div>

        <div className="list-group">
          {repos.map(repo =>
            <RepoListRow key={repo.id} repo={repo} onSelect={onSelect} />
          )}
        </div>
      </div>
    );
};

RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default RepoList;
