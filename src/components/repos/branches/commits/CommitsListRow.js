import React, {PropTypes} from 'react';

const CommitsListRow = ({repoId, branchName, commit, onSelect}) => {
  let shortSha = firstSevenOfSha(commit.sha);

  return (
    <button type="button" className="list-group-item" data-repo-id={repoId} data-branch-name={branchName} value={commit.sha} onClick={onSelect}>{shortSha}</button>
  );
};

function firstSevenOfSha(sha){
  return sha.slice(0, 7);
}

CommitsListRow.propTypes = {
  repoId: PropTypes.number.isRequired,
  branchName: PropTypes.string.isRequired,
  commit: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CommitsListRow;
