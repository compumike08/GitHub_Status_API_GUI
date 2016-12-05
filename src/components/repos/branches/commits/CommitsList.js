import React, {PropTypes} from 'react';
import CommitsListRow from './CommitsListRow';

const CommitsList = ({repoId, repoName, branchName, commits, onSelect}) => {
  return (
    <div className="list-group">
      {commits.map(commit =>
        <CommitsListRow key={commit.sha} repoId={repoId} repoName={repoName} branchName={branchName} commit={commit} onSelect={onSelect} />
      )}
    </div>
  );
};

CommitsList.propTypes = {
  repoId: PropTypes.number.isRequired,
  repoName: PropTypes.string.isRequired,
  branchName: PropTypes.string.isRequired,
  commits: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CommitsList;
