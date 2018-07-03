import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Footer from '../components/Footer';
import Header from '../components/Header';
import LandingPage from '../components/LandingPage';
import NotFoundPage from '../components/NotFoundPage';
import StackDetailPage from '../components/StackDetailPage';
import StacksPage from '../components/StacksPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Redirect exact from="/" to="/landing" />
        <Route path="/stacks/:stackType/technologies/:technologyId" component={StackDetailPage} />
        <Route path="/stacks/:stackType" component={StackDetailPage} />
        <Route path="/stacks" component={StacksPage} />
        <Route path="/landing" component={LandingPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;
