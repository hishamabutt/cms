import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ReactToPrint from 'react-to-print';
import logo from '../../img/clinic.png';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';

class ComponentToPrint extends React.Component {
  render() {
    return (
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
                        Key #: {this.props.formData.key}
                        <br></br>
                        Password:{this.props.formData.password}
                        <br></br>
                        Created: {moment(Date.now()).format('MM/DD/YYYY')}
                        <br></br>
                        Refered By:{this.props.formData.referedBy}
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
                        {this.props.formData.name}
                        <br></br>
                        {this.props.formData.age}
                        <br></br>
                        {this.props.formData.mobileNo}
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
          {this.props.formData.tests.map((test, i) => {
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

              <td>Discount: {this.props.formData.discount}</td>
            </tr>
          </tbody>
          <tbody>
            <tr className='total'>
              <td></td>

              <td>Total: {this.props.formData.totalBill}</td>
            </tr>
          </tbody>
          <tbody>
            <tr className='total'>
              <td></td>

              <td>Amount Paid: {this.props.formData.amountPaid}</td>
            </tr>
          </tbody>
          <tbody>
            <tr className='total'>
              <td></td>

              <td>Amount Remaining: {this.props.formData.amountRemaining}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const PrintInvoice = (props) => {
  const componentRef = useRef();
  return (
    <div>
      {!props.location.state && <Redirect to='/addUser'></Redirect>}
      {props.location.state && console.log(props.location.state.data.key)}
      {props.location.state && console.log(props.location.state.data.password)}
      {props.location.state && console.log(props.location.state.data.name)}
      {props.location.state && console.log(props.location.state.data.mobileNo)}
      {props.location.state && console.log(props.location.state.data.age)}
      {props.location.state && console.log(props.location.state.data.sex)}
      {props.location.state && console.log(props.location.state.data.discount)}
      {props.location.state && console.log(props.location.state.data.referedBy)}
      {props.location.state && console.log(props.location.state.data.tests)}
      {props.location.state && console.log(props.location.state.data.totalBill)}
      {props.location.state &&
        console.log(props.location.state.data.amountPaid)}
      {props.location.state &&
        console.log(props.location.state.data.amountRemaining)}

      <Link to='/addUser' className='btn btn-dark'>
        Back
      </Link>
      <ReactToPrint
        // onBeforePrint={() => console.log('hello')}
        trigger={() => (
          <button href='#' className='btn btn-primary'>
            Print
          </button>
        )}
        content={() => componentRef.current}
      />
      {props.location.state && (
        <ComponentToPrint
          ref={componentRef}
          formData={props.location.state.data}
        ></ComponentToPrint>
      )}
    </div>
  );
};

PrintInvoice.propTypes = {};

export default PrintInvoice;
