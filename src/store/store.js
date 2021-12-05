import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import preferencesReducer from '../reducers/preferences';
import technologiesReducer from '../reducers/technologies';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
  const store = createStore(
    combineReducers({
      preferences: preferencesReducer,
      technologies: technologiesReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

const store = configureStore();

export default store;