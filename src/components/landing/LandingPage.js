import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [animation, setAnimation] = useState('animate__animated animate__swing');

  return (
    <div className="page">
      <div className="container">
        <div className="row my-5" >
          <div className="col">
            <h1 className="display-1 d-flex">
              <div className="me-2">Hello,</div>
              <div
                className={`text-primary ${animation}`}
                onMouseEnter={() => setAnimation('animate__animated animate__pulse')}
                onMouseLeave={() => setAnimation('')}>React</div>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="lead">
              Welcome to the <span className="text-primary">LEAN</span><span className="fw-bold">STACKS</span> React starter project.
              This project provides a template to kickstart React single-page applications
              utilizing a curated <Link className="text-decoration-none" to="/stacks">Technology Stack</Link> for optimal testability, maintainability,
              and operability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
