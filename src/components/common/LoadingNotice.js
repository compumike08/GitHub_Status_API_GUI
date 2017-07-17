import React, {PropTypes} from 'react';
import {PANEL_CONTENT_TYPE_CLASS} from "../../constants/constants";

const LoadingNotice = ({panelContentType = PANEL_CONTENT_TYPE_CLASS.BODY}) => {
  let panelTypeClassString;

  switch (panelContentType) {
    case PANEL_CONTENT_TYPE_CLASS.HEADING:
      panelTypeClassString = PANEL_CONTENT_TYPE_CLASS.HEADING;
      break;
    case PANEL_CONTENT_TYPE_CLASS.BODY:
      panelTypeClassString = PANEL_CONTENT_TYPE_CLASS.BODY;
      break;
    default:
      console.log("ERROR: An invalid panelContentType value was passed to LoadingNotice component");
      panelTypeClassString = "";
  }

  return (
    <div className={panelTypeClassString}>
      <span className="bold italic">Loading...</span>
    </div>
  );
};

LoadingNotice.propTypes = {
  panelContentType: PropTypes.string
};

export default LoadingNotice;
