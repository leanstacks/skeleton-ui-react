import React from 'react';

import CurrentMoment from './CurrentMoment';

const Footer = () => (
  <footer className="bg-dark text-light mt-5 py-5">
    <div className="container">
      <div className="row">
        <div className="col text-left">
          <ul className="list-unstyled">
            <li>React Starter Project</li>
            <li>A <span className="text-blue">LEAN</span><strong>STACKS</strong> Solution</li>
            <li>&copy;&nbsp;<CurrentMoment format="YYYY" /></li>
          </ul>
        </div>
        <div className="col text-center d-none d-sm-block">
          <ul className="list-unstyled">
            <li><CurrentMoment /></li>
          </ul>
        </div>
        <div className="col text-right">
          <ul className="list-unstyled">
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
