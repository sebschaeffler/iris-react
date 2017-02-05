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

// Test ---
var api = new Api().setId(1).setName('Share prices');
INITIAL_STATE.get('list').add(api);
api = new Api().setId(2).setName('Accounts');
INITIAL_STATE.get('list').add(api);
api = new Api().setId(3).setName('Balances');
INITIAL_STATE.get('list').add(api);
// End ---

export default function (state = INITIAL_STATE, action) {
  const { response, errorMessage } = action;
  switch (action.type) {
    case types.LOAD:
      return state
        .set('isProcessing', true)
        .set('errors', null)
        .set('list', response.data);
    case types.LOAD_SUCCESS:
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
