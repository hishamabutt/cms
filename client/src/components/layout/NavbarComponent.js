import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const NavbarComponent = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-home'></i>{' '}
          <span className='hide-sm'> Dashboard</span>
        </Link>
        <Link to='addtest'>
          <i className='fas fa-vials'></i>{' '}
          <span className='hide-sm'> Add Test</span>
        </Link>
        <Link to='/adddoctor'>
          <i className='fas fa-user-nurse'></i>{' '}
          <span className='hide-sm'> Add Doctor</span>
        </Link>
        <Link to='uploadreport'>
          <i className='fas fa-file-word'></i>{' '}
          <span className='hide-sm'> Upload Report</span>
        </Link>
        <Link onClick={logout} to='/'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'> Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/login'>
          <i className='fas fa-users-cog'></i>
          <span className='hide-sm'> Admin</span>
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-user-md'></i> Family Clinic
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

NavbarComponent.prototype = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavbarComponent);
