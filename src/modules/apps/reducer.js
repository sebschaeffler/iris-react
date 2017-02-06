import { Record } from 'immutable';
import * as types from './actionTypes';
import { App, Apps } from './model';

const StateRecord = new Record({
  list: new Apps(),
  isLoading: false,
  isSuccessfullyLoaded: false,
  errors: null
});

class State extends StateRecord {
}

const INITIAL_STATE = new State();

export default function (state = INITIAL_STATE, action) {
  const { response, errorMessage } = action;
  switch (action.type) {
    case types.LOAD:
      return state
        .set('isLoading', true)
        .set('errors', null);
    case types.LOAD_SUCCESS:
      // Clear api list
      state.get('list').clear();
      // Convert entities into an API
      const keys = Object.keys(response.entities.apps);
      keys.map(key =>
        state.get('list').add(new App(response.entities.apps[key]))
      );
      // Return state
      return state
        .set('isLoading', false)
        .set('isSuccessfullyLoaded', true)
        .set('errors', null);
    case types.LOAD_ERROR:
      return state
        .set('isLoading', false)
        .set('isSuccessfullyLoaded', false)
        .set('errors', errorMessage);
    default:
      return state;
  }
}
