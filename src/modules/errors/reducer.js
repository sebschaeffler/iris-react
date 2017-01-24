// @flow
import * as t from './actionTypes';
import { ImmutableState } from './model';
import type { Action } from './actions';

const INITIAL_STATE = new ImmutableState();

export default (state: ImmutableState = INITIAL_STATE, action: Action) => {
  const type = action.type;

  if (type === t.RESET_MESSAGE) {
    return state.setMessage(null);
  } else if (action.errorMessage) {
    return state.setMessage(action.errorMessage);
  }

  return state;
}
