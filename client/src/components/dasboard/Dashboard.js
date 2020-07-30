import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <section className='dashboard'>
      <div className='dark-overlay'>
        <div className='dashboard-inner'>
          <h1 className='x-large'>Family Clinic</h1>
          <p className='lead'>Add User</p>
          <div className='buttons'>
            <Link to='/adduser' className='btn btn-dark'>
              Add User
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
