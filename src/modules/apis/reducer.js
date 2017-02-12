import { Record } from 'immutable';
import * as types from './actionTypes';
import { Api, Apis } from '../../model';

const StateRecord = new Record({
  api: new Api(), // for create or detail
  list: new Apis(), // for retrieving list of apis
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
      if (response.entities !== null && response.entities.apis) {
        // Convert entities into an API
        const keys = Object.keys(response.entities.apis);
        keys.map(key =>
          state.get('list').add(new Api(response.entities.apis[key]))
        );
      } else if (response.result) {
        state = state.update('api', api => new Api(response.result));
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
      // Clear last results
      state.get('list').clear();
      return state
        .set('isProcessing', true)
        .set('errors', null)
        .update('api', (values) =>
          parameters
        );
    case types.SUBMIT_SUCCESS:
      return state
        .set('isProcessing', false)
        .set('isSuccessful', true)
        .set('errors', null);
    case types.SUBMIT_ERROR:
      return state
        .set('isProcessing', false)
        .set('isSuccessful', false)
        .set('errors', errorMessage);
    case types.RESET:
      console.log("RESET");
      return state
        .set('isProcessing', false)
        .set('isSuccessful', false)
        .set('api', new Api());
    case types.UPDATE:
      // Clear last results
      state.get('list').clear();
      return state
        .set('isProcessing', true)
        .set('errors', null)
        .update('api', (values) =>
          parameters
        );
    case types.UPDATE_SUCCESS:
      return state
        .set('isProcessing', false)
        .set('isSuccessful', true)
        .set('api', new Api())
        .set('errors', null);
    case types.UPDATE_ERROR:
      return state
        .set('isProcessing', false)
        .set('isSuccessful', false)
        .set('errors', errorMessage);
    case types.DELETE:
      // Clear last results
      state.get('list').clear();
      return state
        .set('isProcessing', true)
        .set('errors', null);
    case types.DELETE_SUCCESS:
      return state
        .set('isProcessing', false)
        .set('isSuccessful', true)
        .set('api', new Api())
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
