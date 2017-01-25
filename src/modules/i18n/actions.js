import * as t from './actionTypes';

export const types = t;

export const setLocale = (locale) => {
  return {
    type: t.SET_LOCALE,
    locale
  };
};
