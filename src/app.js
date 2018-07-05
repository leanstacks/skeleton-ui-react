import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';

import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';

import LoadingPage from './components/LoadingPage';

import { startSetTechnologies, setTechnologies } from './actions/technologies';

import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/js/all';
import './styles/styles.scss';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// Initialize the Application State
const technologiesLastUpdated = (localStorage.getItem('technologies_lu')) ? moment(Number.parseInt(localStorage.getItem('technologies_lu'))) : moment(0);
console.log('technologiesLastUpdated', technologiesLastUpdated.format());
const technologiesState = (localStorage.getItem('technologies')) ? JSON.parse(localStorage.getItem('technologies')) : null;
if (technologiesLastUpdated.add(1, 'hours').isBefore(moment())) {
  // Cached Data is Stale or Does Not Exist
  console.log('Cached Data is Stale or Does Not Exist');
  // Fetch Data using API
  store.dispatch(startSetTechnologies()).then(() => {
    console.log('startSetTechnologies success');
    renderApp();
  }).catch((err) => {
    //TODO Handle API Failure
    console.log('startSetTechnologies failure');
  });
} else if (technologiesState) {
  // Cached Data Exists and is Current
  console.log('Cached Data Exists and is Current');
  store.dispatch(setTechnologies(technologiesState));
  renderApp();
} else {
  renderApp();
  history.push('/landing');
}
