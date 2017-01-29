import React, {PropTypes} from 'react';
import TextInput from '../../common/TextInput';
import SelectInput from '../../common/SelectInput';

import {GITHUB_STATUS_STATES} from "../../../utils/constants";
import {makeOptionsArrayFromStrings} from "../../../utils/utilityMethods";

const CreateStatusForm = ({newStatus, onChange, onSubmit}) => {
  const optionsArray = makeOptionsArrayFromStrings([GITHUB_STATUS_STATES.PENDING, GITHUB_STATUS_STATES.SUCCESS, GITHUB_STATUS_STATES.FAILURE, GITHUB_STATUS_STATES.ERROR]);

  return (
    <form>
      <SelectInput name="state" value={newStatus.state} label="State" onChange={onChange} options={optionsArray} />

      <TextInput name="description" label="Description" onChange={onChange} value={newStatus.description} />

      <TextInput name="targetUrl" label="Target URL" onChange={onChange} value={newStatus.targetUrl}/>

      <button type="submit" className="btn btn-primary" onClick={onSubmit}>Submit</button>
    </form>
  );
};

CreateStatusForm.propTypes = {
  newStatus: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default CreateStatusForm;
