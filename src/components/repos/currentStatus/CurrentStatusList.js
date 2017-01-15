import React, {PropTypes} from 'react';
import CurrentStatusListRow from './CurrentStatusListRow';

const CurrentStatusList = ({repoId, isFromBranch, branchName, commitSha, statuses}) => {
  return (
    <div>
      {statuses.map(status =>
        <CurrentStatusListRow key={status.id} repoId={repoId} isFromBranch={isFromBranch} branchName={branchName} commitSha={commitSha} status={status} />
      )}
    </div>
  );
};

CurrentStatusList.propTypes = {
  repoId: PropTypes.string.isRequired,
  isFromBranch: PropTypes.bool.isRequired,
  branchName: PropTypes.string.isRequired,
  commitSha: PropTypes.string.isRequired,
  statuses: PropTypes.array.isRequired
};

export default CurrentStatusList;
