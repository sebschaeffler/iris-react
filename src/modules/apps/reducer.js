import * as types from './actionTypes';
import * as model from './model';

const INITIAL_STATE = new model.Apps();

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOAD:
      return state;
    case types.SUBMIT:
      return state;
    default:
      return state;
  }
}
