import React, {PropTypes} from 'react';
import moment from 'moment';

const CurrentStatusesListRow = ({repoId, isFromBranch, branchName, commitSha, status}) => {
  let statusCreatedAtDateTime = moment(status.createdAt);
  let statusCreatedAtString = statusCreatedAtDateTime.format("MM/DD/YYYY h:mm:ss A");

  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="panel panel-default sub-panel"
             value={status.id}
             data-repo-id={repoId}
             data-is-from-branch={isFromBranch}
             data-branch-name={branchName}
             data-commit-sha={commitSha}
        >
          <div className="panel-heading panel-heading-small">
            <div className="row">
              <div className="col-xs-12 col-sm-7 text-center-xs">
                {status.state == "pending" &&
                <div className="label label-warning">pending</div>
                }
                {status.state == "success" &&
                <div className="label label-success">success</div>
                }
                {status.state == "error" &&
                <div className="label label-danger">error</div>
                }
                {status.state == "failure" &&
                <div className="label label-danger">failure</div>
                }
              </div>
              <div className="col-xs-12 col-sm-5 text-center-xs">
                <div className="pull-right-sm">
                  Created At: <span className="normal">{statusCreatedAtString}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="panel-body">
            <form className="form">
              <div className="row">
                <div className="col-sm-8 col-md-6">
                  <div className="form-group">
                    <label className="control-label">Description:</label>
                    <div>
                      <p className="form-control-static">{status.description}</p>
                    </div>
                  </div>
                </div>

                <div className="col-sm-4 col-md-6">
                  <div className="form-group">
                    <label className="control-label">Created By:</label>
                    <div>
                      <p className="form-control-static">{status.creator.login}</p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


CurrentStatusesListRow.propTypes = {
  repoId: PropTypes.string.isRequired,
  isFromBranch: PropTypes.bool.isRequired,
  branchName: PropTypes.string.isRequired,
  commitSha: PropTypes.string.isRequired,
  status: PropTypes.object.isRequired
};

export default CurrentStatusesListRow;
