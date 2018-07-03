import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import stacksReducer from '../reducers/technologies';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        stacksReducer,
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
