import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadReport } from '../../actions/upload';

const UploadFile = ({ uploadReport }) => {
  const [formData, setFormData] = useState({
    key: '',
    file: '',
  });

  const { key, file } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeFile = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    uploadReport(key, file);
    setFormData({ key: '', file: '' });
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Upload Report</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Enter the key of the Patient
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Key'
            name='key'
            value={key}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input type='file' name='file' onChange={onChangeFile} />
        </div>

        <input type='submit' className='btn btn-primary' value='Upload' />
      </form>
    </Fragment>
  );
};

UploadFile.propTypes = {
  uploadReport: PropTypes.func.isRequired,
};

export default connect(null, { uploadReport })(UploadFile);
