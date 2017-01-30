import * as t from './actionTypes';

export function submitNewApi(params) {
  return {
    type: t.SUBMIT,
    params
  };
};
