import * as t from './actionTypes';
import { ImmutableState } from './model';

const INITIAL_STATE = new ImmutableState();

export default (state = INITIAL_STATE, action) => {
  const type = action.type;

  if (type === t.RESET_MESSAGE) {
    return state.setMessage(null);
  } else if (action.errorMessage) {
    return state.setMessage(action.errorMessage);
  }

  return state;
}
