import { Record } from 'immutable';
import * as types from './actionTypes';
import * as model from '../../model/api';

const StateRecord = new Record({
  api: new model.Api(),
  isProcessing: false,
  isSuccessful: false,
  errors: null
});

class State extends StateRecord {
}

const INITIAL_STATE = new State();

export default function (state = INITIAL_STATE, action) {
  const { parameters, errorMessage } = action;
  switch (action.type) {
    case types.SUBMIT:
      return state
        .set('isProcessing', true)
        .set('errors', null)
        .update('api', (values) =>
          parameters
        );
    case types.SUBMIT_SUCCESSFUL:
      return state
        .set('isProcessing', false)
        .set('isSuccessful', true)
        .set('errors', null);
    case types.SUBMIT_FAILED:
      return state
        .set('isProcessing', false)
        .set('isSuccessful', false)
        .set('errors', errorMessage);
    default:
      return state;
  }
}
