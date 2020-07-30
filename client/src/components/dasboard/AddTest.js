import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTest } from '../../actions/test';
import { Link } from 'react-router-dom';

const AddTest = ({ addTest }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
  });

  const { name, price } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addTest(name, price);
    setFormData({ name: '', price: '' });
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add Test</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Enter Name of the Test
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
        <div className='form-group'>
          <input
            type='number'
            placeholder='Price'
            name='price'
            value={price}
            onChange={(e) => onChange(e)}
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Add Test' />
      </form>
      <br></br>
      <Link to='/alltests' className='btn btn-dark'>
        View Tests
      </Link>
    </Fragment>
  );
};

AddTest.propTypes = {
  addTest: PropTypes.func.isRequired,
};

export default connect(null, { addTest })(AddTest);
