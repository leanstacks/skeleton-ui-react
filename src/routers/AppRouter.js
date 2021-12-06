import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import ErrorBoundary from '../components/ErrorBoundary';
import ScrollToTop from '../components/common/ScrollToTop';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import LandingPage from '../components/landing/LandingPage';
import StackDetailPage from '../components/stacks/StackDetailPage';
import StacksPage from '../components/stacks/StacksPage';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <ErrorBoundary>
      <ScrollToTop />
      <Header />
      <Switch>
        <Route path="/stacks/:stackType/technologies/:technologyId">
          <StackDetailPage />
        </Route>
        <Route path="/stacks/:stackType">
          <StackDetailPage />
        </Route>
        <Route path="/stacks">
          <StacksPage />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
      <Footer />
    </ErrorBoundary>
  </Router>
);

export default AppRouter;
