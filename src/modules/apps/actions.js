import * as t from './actionTypes';

export function load() {
  return {
    type: t.LOAD
  };
};

export function submit(params) {
  return {
    type: t.SUBMIT,
    params
  };
};
