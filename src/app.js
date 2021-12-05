import 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import 'animate.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './store/store';
import Config from './config/config';
import storage from './utils/storage';

import LoadingPage from './components/LoadingPage';

import { setPreferences } from './actions/preferences';
import { startSetTechnologies } from './actions/technologies';

import './styles/styles.scss';

// render the application just once
let hasRendered = false;
const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

// load application configuration
const loadConfiguration = async () => {
  try {
    await Config.init();
  } catch (err) {
    console.log(`Error initializing configuration.`, err);
  }
};

// initialize user preferences
const initPreferences = () => {
  try {
    const defaultPreferences = {
      theme: 'theme-light'
    };
    const savedPreferences = storage.getJson(storage.KEY.PREFERENCES);
    const mergedPreferences = Object.assign({}, defaultPreferences, savedPreferences);
    storage.setJson(storage.KEY.PREFERENCES, mergedPreferences);
    store.dispatch(setPreferences(mergedPreferences));
  } catch (err) {
    console.log(`Error initializing preferencs.`, err);
  }
};

const initApplication = async () => {
  try {
    await store.dispatch(startSetTechnologies());
  } catch (err) {
    console.log(`Error initializing application data.`, err);
  }
}

// sequence application startup activities
const startApplication = async () => {
  try {
    await loadConfiguration();
    initPreferences();
    await initApplication();
    renderApp();
  } catch (err) {
    console.error(`A fatal error occurred starting the application.`, err);
  }
};

// render loading page while performing application startup
ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// start the application
startApplication();
