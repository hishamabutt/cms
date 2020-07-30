import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getReport, clearUser } from '../../actions/user';
import { Link } from 'react-router-dom';

// import { Document } from 'react-pdf';
// import { FileSaver } from 'file-saver';
// import { saveAs } from 'file-saver';

const Report = ({ getReport, user: { file, loading }, clearUser }) => {
  const [formData, setFormData] = useState({
    key: '',
    password: '',
  });

  const { key, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    getReport(key, password);
    setFormData({ key: '', password: '' });
  };

  if (loading === false && file != null) {
    let f = file;
    clearUser();
    // return <Link to={`/uploads/${f}`} target='_blank' download></Link>;
    window.open(`/uploads/${f}`, '_blank');
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Get Report</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into to get report
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
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Get Report' />
      </form>
    </Fragment>
  );
};

Report.propTypes = {
  getReport: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { getReport, clearUser })(Report);
