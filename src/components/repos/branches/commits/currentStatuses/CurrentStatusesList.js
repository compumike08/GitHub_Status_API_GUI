import React, {PropTypes} from 'react';
import CurrentStatusesListRow from './CurrentStatusesListRow';

const CurrentStatusesList = ({repoId, isFromBranch, branchName, commitSha, statuses}) => {
  return (
    <div>
      {statuses.map(status =>
        <CurrentStatusesListRow key={status.id} repoId={repoId} isFromBranch={isFromBranch} branchName={branchName} commitSha={commitSha} status={status} />
      )}
    </div>
  );
};

CurrentStatusesList.propTypes = {
  repoId: PropTypes.string.isRequired,
  isFromBranch: PropTypes.bool.isRequired,
  branchName: PropTypes.string.isRequired,
  commitSha: PropTypes.string.isRequired,
  statuses: PropTypes.array.isRequired
};

export default CurrentStatusesList;
