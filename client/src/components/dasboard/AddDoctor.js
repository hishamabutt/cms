import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addDoctor } from '../../actions/doctor';

const AddDoctor = ({ addDoctor }) => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const { name } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addDoctor(name);
    setFormData({ name: '' });
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Doctor</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Enter Name of the Doctor
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Add Doctor' />
      </form>
    </Fragment>
  );
};

AddDoctor.propTypes = {
  addDoctor: PropTypes.func.isRequired,
};

export default connect(null, { addDoctor })(AddDoctor);
