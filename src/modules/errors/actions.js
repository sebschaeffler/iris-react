import * as t from './actionTypes';

export const types = t;

export const resetMessage = () => {
  return {
    type: t.RESET_MESSAGE
  };
};

export const setMessage = (errorMessage) => {
  return {
    type: t.SET_MESSAGE,
    errorMessage: errorMessage
  };
};
