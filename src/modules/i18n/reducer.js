// @flow
import * as t from './actionTypes';
import { ImmutableState } from './model';
import type { Action } from './actions';

const INITIAL_STATE = new ImmutableState();

export default (state: ImmutableState = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case t.SET_LOCALE:
      const locale = action.locale;
      return state.setLocale(locale);
    default:
      return state;
  }
}
