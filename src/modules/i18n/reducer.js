import * as t from './actionTypes';
import { ImmutableState } from './model';

const INITIAL_STATE = new ImmutableState();

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.SET_LOCALE:
      const locale = action.locale;
      return state.setLocale(locale);
    default:
      return state;
  }
}
