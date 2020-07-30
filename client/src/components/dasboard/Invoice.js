import React, { useState } from 'react';
import logo from '../../img/clinic.png';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';
import { Form } from 'reactstrap';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import axios from 'axios';

const Invoice = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    age: '',
    sex: '',
    discount: '',
    referedBy: '',
    tests: [],
    check: false,
    amountPaid: '',
    amountRemaining: '',
    key: '',
    password: '',
    totalBill: '',
  });
  let {
    name,
    mobileNo,
    age,
    sex,
    discount,
    referedBy,
    tests,
    check,
    key,
    password,
    totalBill,
    amountPaid,
    amountRemaining,
  } = formData;

  const sum = (tests, discount) => {
    let bill = 0;

    tests.map((t) => {
      return (bill = bill + t.price);
    });

    let x = bill * (discount / 100);
    bill = bill - x;
    return bill;
  };
  const onChange = (e) => {
    console.log(amountPaid);

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);

    check = true;

    if (amountPaid === '') {
      window.scrollTo(0, 0);
      props.setAlert('Amount is requird', 'danger');
      check = false;
    }

    if (check === true && props.location.state) {
      totalBill = sum(
        props.location.state.data.tests,
        props.location.state.data.discount
      );
      amountRemaining = totalBill - amountPaid;

      // setFormData({
      //   ...formData,
      // name: props.location.state.data.name,
      // mobileNo: props.location.state.data.mobileNo,
      // age: props.location.state.data.age,
      // sex: props.location.state.data.sex,
      // discount: props.location.state.data.discount,
      // referedBy: props.location.state.data.referedBy,
      // });
      name = props.location.state.data.name;
      mobileNo = props.location.state.data.mobileNo;
      age = props.location.state.data.age;
      sex = props.location.state.data.sex;
      discount = props.location.state.data.discount;
      referedBy = props.location.state.data.referedBy;
      props.location.state.data.tests.map((t) => {
        return tests.push({ name: t.name, price: t.price });
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify({
        name,
        mobileNo,
        age,
        sex,
        totalBill,
        discount,
        referedBy,
        tests,
        amountPaid,
        amountRemaining,
      });
      try {
        const res = await axios.post('/api/user', body, config);
        setFormData({
          ...formData,
          check: true,
          key: res.data.key,
          password: res.data.password,
          name: props.location.state.data.name,
          mobileNo: props.location.state.data.mobileNo,
          age: props.location.state.data.age,
          sex: props.location.state.data.sex,
          discount: props.location.state.data.discount,
          referedBy: props.location.state.data.referedBy,
          totalBill: sum(
            props.location.state.data.tests,
            props.location.state.data.discount
          ),
          amountRemaining: totalBill - amountPaid,
        });
        props.setAlert('User Added', 'success');
      } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => props.setAlert(error.msg, 'danger'));
        }
      }
    }

    // window.open('/printinvoice');
    // addPatient(name, mobileNo, age, sex, totalBill, discount, referedBy, tests);
  };

  if (check === true) {
    // console.log(formData);
    return (
      <Redirect
        to={{
          pathname: '/printinvoice',
          state: { data: formData },
        }}
      />
    );
  }
  return (
    <div>
      {!props.location.state ? (
        <Redirect to='/addUser'></Redirect>
      ) : (
        <div>
          <Link to='/addUser' className='btn btn-dark'>
            Back
          </Link>
          <div className='invoice-box'>
            <table cellPadding='0' cellSpacing='0'>
              <tbody>
                <tr className='top'>
                  <td colSpan='2'>
                    <table>
                      <tbody>
                        <tr>
                          <td className='title'>
                            <img
                              src={logo}
                              style={{ width: '50%', maxWidth: '100px' }}
                            />
                          </td>

                          <td>
                            Key #:{key}
                            <br></br>
                            Password:{password}
                            <br></br>
                            Created: {moment(Date.now()).format('MM/DD/YYYY')}
                            <br></br>
                            Refered By:{props.location.state.data.referedBy}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>

              <tbody>
                <tr className='information'>
                  <td colSpan='2'>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            Family Clinic<br></br>
                            address<br></br>
                            042-3715555
                          </td>

                          <td>
                            {props.location.state.data.name}
                            <br></br>
                            {props.location.state.data.age}
                            <br></br>
                            {props.location.state.data.mobileNo}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>

              <tbody>
                <tr className='heading'>
                  <td>Item</td>

                  <td>Price</td>
                </tr>
              </tbody>
              {/* <tbody> */}
              {props.location.state.data.tests.map((test, i) => {
                return (
                  <tbody key={i}>
                    <tr className='item'>
                      <td>{test.name}</td>
                      <td>{test.price}</td>
                    </tr>
                  </tbody>
                );
              })}

              {/* <tr className='item'>
              <td>Website design</td>

              <td>$300.00</td>
            </tr> */}
              {/* </tbody> */}
              {/* <tbody>
            <tr className='item'>
              <td>Hosting (3 months)</td>

              <td>$75.00</td>
            </tr>
          </tbody>
          <tbody>
            <tr className='item last'>
              <td>Domain name (1 year)</td>

              <td>$10.00</td>
            </tr>
          </tbody> */}

              <tbody>
                <tr className='total'>
                  <td></td>

                  <td>Discount: {props.location.state.data.discount}</td>
                </tr>
              </tbody>
              <tbody>
                <tr className='total'>
                  <td></td>

                  <td>
                    Total:{' '}
                    {sum(
                      props.location.state.data.tests,
                      props.location.state.data.discount
                    )}
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr className='total'>
                  <td></td>

                  <td>
                    <form>
                      <input
                        type='number'
                        name='amountPaid'
                        placeholder='Amount Paid'
                        value={amountPaid}
                        onChange={(e) => onChange(e)}
                      ></input>
                    </form>
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr className='total'>
                  <td></td>

                  <td>
                    <Form className='form' onSubmit={(e) => onSubmit(e)}>
                      <input
                        type='submit'
                        className='btn btn-primary'
                        value='Next'
                      />
                    </Form>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

Invoice.propTypes = {};

export default connect(null, { setAlert })(Invoice);
