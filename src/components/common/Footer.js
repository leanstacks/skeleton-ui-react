import React from 'react';

import CurrentMoment from '../common/CurrentMoment';

const Footer = () => (
  <footer className="footer">
    <div className="container-fluid h-100">
      <div className="row h-100 justify-content-between align-items-center">
        <div className="col-auto">
          React Starter Project
        </div>
        <div className="col-auto">
          <a href="#" className="text-reset me-2">Terms</a>
          <a href="#" className="text-reset">Privacy</a>
        </div>
        <div className="col-auto">
          <CurrentMoment />
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
