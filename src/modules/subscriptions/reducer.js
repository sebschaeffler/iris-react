//import * as types from './actionTypes';
import * as model from './model';

const INITIAL_STATE = new model.Subscription();

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
