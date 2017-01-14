import React, {PropTypes} from 'react';

const CurrentStatusListRow = ({}) => {
  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <div className="panel panel-default sub-panel">
            <div className="panel-heading panel-heading-small">
              <div className="row">
                <div className="col-sm-6">
                  <div>
                    <div className="label label-success">success</div> Context: <span className="normal">context/test</span>
                  </div>
                </div>
                <div className="col-sm-6 pad-top-xs">
                  <div className="pull-right-sm">
                    Created At: <span className="normal">2012-07-20T01:19:13Z</span>
                  </div>
                </div>
              </div>
            </div>
              <form className="form">
                <div className="row buffer-space">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label">Description:</label>
                      <div>
                        <p className="form-control-static">Build has completed successfully</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label">Created By:</label>
                      <div>
                        <p className="form-control-static">compumike08</p>
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


CurrentStatusListRow.propTypes = {
  //property: PropTypes.type[.isRequired]
};

export default CurrentStatusListRow;
