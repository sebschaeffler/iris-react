import { Record } from 'immutable';
import * as types from './actionTypes';
import { App, Apps } from './model';

const StateRecord = new Record({
  list: new Apps(),
  app: new App(), // current app
  currentAction: null,
  isProcessing: false,
  isSuccessful: false,
  errors: null
});

class State extends StateRecord {
}

const INITIAL_STATE = new State();

export default function (state = INITIAL_STATE, action) {
  const { parameters, response, errorMessage } = action;
  // Current action
  state = state.set('currentAction', action.type);
  switch (action.type) {
    case types.LOAD:
      return state
        .set('isProcessing', true)
        .set('errors', null);
    case types.LOAD_SUCCESS:
      // Clear api list
      state.get('list').clear();
      // Load expects either a list of results or a single result (which is not a singletonlist)
      if (response.entities !== null && response.entities.apps) {
        // Convert entities into an API
        const keys = Object.keys(response.entities.apps);
        keys.map(key =>
          state.get('list').add(new App(response.entities.apps[key]))
        );
      } else if (response.result) {
        state = state.update('app', app => new App(response.result));
      }
      // Return state
      return state
        .set('isProcessing', false)
        .set('isSuccessful', true)
        .set('errors', null);
    case types.LOAD_ERROR:
      return state
        .set('isProcessing', false)
        .set('isSuccessful', false)
        .set('errors', errorMessage);
    case types.SUBMIT:
      return state
        .set('isProcessing', true)
        .set('errors', null)
        .update('app', (values) =>
          parameters
        );
    case types.SUBMIT_SUCCESS:
      return state
        .set('isProcessing', false)
        .set('isSuccessful', true)
        .set('app', new App())
        .set('errors', null);
    case types.SUBMIT_ERROR:
      return state
        .set('isProcessing', false)
        .set('isSuccessful', false)
        .set('errors', errorMessage);
    case types.RESET:
      return state
        .set('isProcessing', false)
        .set('isSuccessful', false)
        .set('app', new App());
    case types.UPDATE:
      return state
        .set('isProcessing', true)
        .set('errors', null)
        .update('app', (values) =>
          parameters
        );
    case types.UPDATE_SUCCESS:
      return state
        .set('isProcessing', false)
        .set('isSuccessful', true)
        .set('app', new App())
        .set('errors', null);
    case types.UPDATE_ERROR:
      return state
        .set('isProcessing', false)
        .set('isSuccessful', false)
        .set('errors', errorMessage);
    case types.DELETE:
      return state
        .set('isProcessing', true)
        .set('errors', null);
    case types.DELETE_SUCCESS:
      return state
        .set('isProcessing', false)
        .set('isSuccessful', true)
        .set('app', new App())
        .set('errors', null);
    case types.DELETE_ERROR:
      return state
        .set('isProcessing', false)
        .set('isSuccessful', false)
        .set('errors', errorMessage);
    default:
      return state;
  }
}
