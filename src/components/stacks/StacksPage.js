import React from 'react';

import Stack from './Stack';

const StacksPage = (props) => (
  <div className="page">
    <div className="container">
      <div className="row mt-5 mb-3">
        <div className="col-12">
          <h2 className="display-4">Technology Stacks</h2>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-4 mb-3 mb-md-0">
          <Stack name="Application" type="application" />
        </div>
        <div className="col-12 col-md-4 mb-3 mb-md-0">
          <Stack name="Test" type="test" />
        </div>
        <div className="col-12 col-md-4 mb-3 mb-md-0">
          <Stack name="Build" type="build" />
        </div>
      </div>
    </div>
  </div>
);


export default StacksPage;