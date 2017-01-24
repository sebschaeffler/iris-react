// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import DevTools from '../__dev__/dev_tools';
import api from '../middleware/api';
import dbpApp from '../rootReducer';

const configureStore = (preloadedState: any) => {
  const store = createStore(
    dbpApp,
    preloadedState,
    compose(
      applyMiddleware(thunk, api, createLogger()),
      DevTools.instrument()
  ));

  const hot: any = module.hot ? module.hot: null
  if (hot) {
    // Enable Webpack hot module replacement for reducers
    hot.accept('../rootReducer', () => {
      const nextRootReducer = require('../rootReducer').default
      store.replaceReducer(nextRootReducer)
    });
  }

  return store;
};

export default configureStore;
