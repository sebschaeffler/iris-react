// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import dbpApp from '../rootReducer.js';

const configureStore = (preloadedState: any) => createStore(
  dbpApp,
  preloadedState,
  applyMiddleware(thunk, api)
);

export default configureStore;
