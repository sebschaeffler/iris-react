import { Record } from 'immutable';
import * as types from './actionTypes';
import { Api, Apis } from '../../model';

const StateRecord = new Record({
  list: new Apis(),
  isProcessing: false,
  isSuccessful: false,
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
        .set('isProcessing', true)
        .set('errors', null);
    case types.LOAD_SUCCESS:
      // Clear api list
      state.get('list').clear();
      // Convert entities into an API
      const keys = Object.keys(response.entities.apis);
      keys.map(key =>
        state.get('list').add(new Api(response.entities.apis[key]))
      );
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
    default:
      return state;
  }
}
