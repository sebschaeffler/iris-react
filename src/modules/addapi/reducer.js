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
  switch (action.type) {
    case types.SUBMIT:
      const { params } = action;
      return state
        .set('isProcessing', true)
        .update('api', (values) =>
          params
        )
    default:
      return state;
  }
}
