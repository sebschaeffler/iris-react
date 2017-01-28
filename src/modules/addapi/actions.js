import * as t from './actionTypes';

export function loadDefaultValues() {
  return {
    type: t.LOAD_DEFAULT_VALUES
  };
};

export function submit(params) {
  return {
    type: t.SUBMIT,
    params
  };
};
