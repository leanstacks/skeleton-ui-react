import React from 'react';

import Stack from './Stack';

const StacksPage = (props) => (
  <div className="page">
    <div className="container">
      <h2 className="display-4">Technology Stacks</h2>
      <div className="row">
        <div className="col-lg col-md-6 col-sm-12 mb-3">
          <Stack name="Application" type="application" />
        </div>
        <div className="col-lg col-md-6 col-sm-12 mb-3">
          <Stack name="Test" type="test" />
        </div>
        <div className="col-lg col-md-6 col-sm-12 mb-3">
          <Stack name="Build" type="build" />
        </div>
      </div>
    </div>
  </div>
);


export default StacksPage;