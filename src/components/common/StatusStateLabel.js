import React, {PropTypes} from 'react';
import {GITHUB_STATUS_STATES} from '../../constants/constants';

const StatusStateLabel = ({statusState, spanModeOn = false}) => {
  let statusElement;
  let labelTypeClass;
  let labelTextString;

  switch (statusState) {
    case GITHUB_STATUS_STATES.PENDING:
      labelTypeClass = "label-warning";
      labelTextString = "pending";
      break;
    case GITHUB_STATUS_STATES.SUCCESS:
      labelTypeClass = "label-success";
      labelTextString = "success";
      break;
    case GITHUB_STATUS_STATES.ERROR:
      labelTypeClass = "label-danger";
      labelTextString = "error";
      break;
    case GITHUB_STATUS_STATES.FAILURE:
      labelTypeClass = "label-danger";
      labelTextString = "failure";
      break;
    default:
      labelTypeClass = null;
      labelTextString = null;
      console.log("ERROR: An invalid statusState value was passed to StatusStateLabel component");
  }

  if ((labelTypeClass !== null) && (labelTextString !== null)) {
    let labelClassesString = "label " + labelTypeClass;

    if (spanModeOn === true) {
      statusElement = (
        <span className={labelClassesString}>{labelTextString}</span>
      );
    } else {
      statusElement = (
        <div className={labelClassesString}>{labelTextString}</div>
      );
    }
  } else {
    statusElement = (
      <div className="label" />
    );
  }

  return statusElement;
};

StatusStateLabel.propTypes = {
  statusState: PropTypes.string.isRequired,
  spanModeOn: PropTypes.bool
};

export default StatusStateLabel;
