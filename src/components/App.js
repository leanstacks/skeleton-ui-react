import React from 'react';
import { connect } from 'react-redux';

import AppRouter from '../routers/AppRouter';

const App = ({ preferences }) => {
  const { theme = 'theme-light' } = preferences;

  return (
    <div className={theme}>
      <AppRouter />
    </div>
  );
};

const mapStateToProps = (state) => ({
  preferences: state.preferences
});

export default connect(mapStateToProps)(App);