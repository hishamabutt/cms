import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Family Clinic</h1>
          <p className='lead'>Check Your Report</p>
          <div className='buttons'>
            <Link to='/report' className='btn btn-dark'>
              Report
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
