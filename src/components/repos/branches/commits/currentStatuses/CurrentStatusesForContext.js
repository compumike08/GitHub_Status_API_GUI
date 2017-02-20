import React, {PropTypes} from 'react';
import CurrentStatusesListRow from './CurrentStatusesListRow';

const CurrentStatusesForContext = ({repoId, isFromBranch, branchName, commitSha, contextName, statusesInContext}) => {
  let mostRecentStatusInContext = statusesInContext[0];

  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="panel panel-default">
          <div className="panel-heading">Context: <span className="normal">{contextName}</span></div>
          <div className="panel-body">
            <div>
              <CurrentStatusesListRow repoId={repoId} isFromBranch={isFromBranch} branchName={branchName} commitSha={commitSha} status={mostRecentStatusInContext} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CurrentStatusesForContext.propTypes = {
  repoId: PropTypes.string.isRequired,
  isFromBranch: PropTypes.bool.isRequired,
  branchName: PropTypes.string.isRequired,
  commitSha: PropTypes.string.isRequired,
  contextName: PropTypes.string.isRequired,
  statusesInContext: PropTypes.array.isRequired
};

export default CurrentStatusesForContext;
