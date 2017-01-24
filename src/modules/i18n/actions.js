// @flow
import * as t from './actionTypes';

export type Action =
  {| type: t.SetLocaleType, locale: string |};

export const types = t;

export const setLocale = (locale: string): Action => {
  return {
    type: t.SET_LOCALE,
    locale
  };
};
