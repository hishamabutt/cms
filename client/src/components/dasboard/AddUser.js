import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addPatient } from '../../actions/patient';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { getAllDoctors } from '../../actions/doctor';
import { getAllTests } from '../../actions/test';
import { Redirect } from 'react-router-dom';
import FilteredMultiSelect from 'react-filtered-multiselect';
import { setAlert } from '../../actions/alert';
import axios from 'axios';

const AddUser = ({
  getAllDoctors,
  getAllTests,
  addPatient,
  test,
  doctor,
  setAlert,
}) => {
  useEffect(() => {
    getAllDoctors();
    getAllTests();
  }, [getAllDoctors, getAllTests]);

  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    age: '',
    sex: '',
    discount: 0,
    referedBy: 'self',
    tests: [],
    temp: [],
    check: false,
    amountPaid: '',
    amountRemaining: '',
    key: '',
    password: '',
    totalBill: '',
  });
  const {
    name,
    mobileNo,
    age,
    sex,
    discount,
    referedBy,
    tests,
    temp,
    check,
    key,
    password,
    totalBill,
    amountPaid,
    amountRemaining,
  } = formData;

  const onChange = (e) => {
    // console.log(referedBy);

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    window.scrollTo(0, 0);
    // let totalBill = 0;

    e.preventDefault();
    temp.map((t) => {
      return tests.push({ name: t.name, price: t.price });
    });
    // temp.map((t) => {
    //   return (totalBill = totalBill + t.price);
    // });
    // let x = totalBill * (discount / 100);
    // totalBill = totalBill - x;
    setFormData({ ...formData, check: true });

    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };
    // const body = JSON.stringify({
    //   name,
    //   mobileNo,
    //   age,
    //   sex,
    //   totalBill,
    //   discount,
    //   referedBy,
    //   tests,
    // });
    // try {
    //   const res = await axios.post('/api/user', body, config);
    //   setFormData({
    //     ...formData,
    //     check: true,
    //     key: res.data.key,
    //     password: res.data.password,
    //     bill: totalBill,
    //   });
    //   setAlert('User Added', 'success');
    // } catch (err) {
    //   const errors = err.response.data.errors;
    //   if (errors) {
    //     errors.forEach((error) => setAlert(error.msg, 'danger'));
    //   }
    // }

    if (name === '') {
      // window.scrollTo(0, 0);
      setAlert('Name is requird', 'danger');
      setFormData({ ...formData, check: false });
    }
    if (mobileNo === '') {
      // window.scrollTo(0, 0);
      setAlert('Mobile Number is requird', 'danger');
      setFormData({ ...formData, check: false });
    }

    if (age === '') {
      // window.scrollTo(0, 0);
      setAlert('Age is requird', 'danger');
      setFormData({ ...formData, check: false });
    }

    if (sex === '') {
      // window.scrollTo(0, 0);
      setAlert('Sex is requird', 'danger');
      setFormData({ ...formData, check: false });
    }
    if (tests.length === 0) {
      // window.scrollTo(0, 0);
      setAlert('Test is requird', 'danger');
      setFormData({ ...formData, check: false });
    }

    // console.log(name);
    // console.log(mobileNo);
    // console.log(age);
    // console.log(sex);
    // console.log(discount);
    // console.log(referedBy);
    // console.log(tests);
    // console.log(totalBill);

    // window.open('/printinvoice');
    // addPatient(name, mobileNo, age, sex, totalBill, discount, referedBy, tests);
  };

  //redirect if Logged in
  //   if (isAuthenticated) {
  //     return <Redirect to='/dashboard' />;
  //   }

  if (check === true) {
    // console.log(formData);
    return (
      <Redirect
        to={{
          pathname: '/previewinvoice',
          state: { data: formData },
        }}
      />
    );
  }
  //here

  const handleDeselect = (index) => {
    var temp2 = temp.slice();
    temp2.splice(index, 1);
    setFormData({ ...formData, temp: temp2 });
    // console.log(temp);
  };

  const handleSelectionChange = (temp) => {
    // console.log(temp);
    setFormData({ ...formData, temp: temp });
    // this.setState({ selectedShips });
  };

  //to here
  // let temp3 = [];
  return (
    <Fragment>
      <h1 className='large text-primary'>Add Patient</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Fill Patient details
      </p>
      <Form className='form' onSubmit={(e) => onSubmit(e)}>
        <FormGroup>
          <Label for='name'>Name</Label>
          <Input
            type='text'
            name='name'
            id='name'
            placeholder='Name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for='mobileNo'>Mobile Number</Label>
          <br></br>
          <Input
            type='number'
            name='mobileNo'
            id='mobileNo'
            placeholder='Mobile Number'
            value={mobileNo}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for='age'>Age</Label>
          <br></br>
          <Input
            type='number'
            name='age'
            id='age'
            placeholder='Age'
            value={age}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <legend>Sex</legend>
        <FormGroup check>
          <Label check>
            <Input
              type='radio'
              name='sex'
              value='m'
              onChange={(e) => onChange(e)}
            />{' '}
            Male
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type='radio'
              name='sex'
              value='f'
              onChange={(e) => onChange(e)}
            />{' '}
            Female
          </Label>
        </FormGroup>
        <FormGroup>
          <Label for='discount'>Discount</Label>
          <br></br>
          <Input
            type='number'
            name='discount'
            id='discount'
            placeholder='Discount'
            value={discount}
            onChange={(e) => onChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for='referedBy'>Refered By</Label>
          <Input
            type='select'
            name='referedBy'
            id='referedBy'
            value={referedBy}
            onChange={(e) => onChange(e)}
          >
            {doctor.loading === false &&
              doctor.name.map((doc, i) => {
                return (
                  <option key={i} value={doc.name}>
                    {doc.name}
                  </option>
                );
              })}
          </Input>
        </FormGroup>
        {/* <FormGroup>
          <Label for='tests'>Select Multiple</Label>
          <Input
            type='select'
            name='tests'
            id='tests'
            onChange={(e) => onTestChange(e)}
            multiple
          >
            {test.loading === false &&
              test.testDetails.map((td, index) => {
                return <option value={index}>{td.name}</option>;
              })}
          </Input>
        </FormGroup> */}
        <label>Select Test</label>
        {test.loading === false && (
          <FilteredMultiSelect
            onChange={handleSelectionChange}
            options={test.testDetails}
            selectedOptions={temp}
            textProp='name'
            valueProp='_id'
          />
        )}
        {temp.length === 0 && <p>(nothing selected yet)</p>}
        {temp.length > 0 && (
          <ul>
            {temp.map((td, i) => (
              <li key={td._id}>
                {`${td.name} `}

                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={() => handleDeselect(i)}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
        <br></br>
        <input type='submit' className='btn btn-primary' value='Add User' />
      </Form>
    </Fragment>
  );
};

AddUser.propTypes = {
  addPatient: PropTypes.func.isRequired,
  getAllDoctors: PropTypes.func.isRequired,
  getAllTests: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  test: state.test,
  doctor: state.doctor,
});

export default connect(mapStateToProps, {
  addPatient,
  getAllTests,
  getAllDoctors,
  setAlert,
})(AddUser);
