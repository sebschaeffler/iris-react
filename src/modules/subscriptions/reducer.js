import { Record } from 'immutable';
import * as types from './actionTypes';
import { Subscription, Subscriptions } from './model';

const StateRecord = new Record({
  list: new Subscriptions(),
  isLoading: false,
  isSuccessfullyLoaded: false,
  errors: null
});

class State extends StateRecord {
}

const INITIAL_STATE = new State();

INITIAL_STATE.get('list').add(new Subscription().setId(1).setName('Dummy subscription'));

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
        state.get('list').add(new Subscription(response.entities.apps[key]))
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
