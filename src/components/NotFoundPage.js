import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="page">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xs-auto">
          <h2>
            <i className="fas fa-exclamation-triangle"></i>&nbsp;Not Found
          </h2>
          <p className="lead">Return to the <Link to="/">stacks</Link>.</p>
        </div>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
