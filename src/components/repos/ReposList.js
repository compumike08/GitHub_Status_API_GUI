import React, {PropTypes} from 'react';
import ReposListRow from './ReposListRow';

const ReposList = ({repos, onSelect}) => {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Repositories</div>
        <div className="panel-body">
          <span className="bold">Select a repository:</span>
          <div className="list-group">
            {repos.map(repo =>
              <ReposListRow key={repo.id} repo={repo} onSelect={onSelect} />
            )}
          </div>
        </div>
      </div>
    );
};

ReposList.propTypes = {
  repos: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default ReposList;
