// @flow
import * as t from './actionTypes';

export type Action =
  {| type: t.ResetMessageActionType |}
  | {| type: t.SetMessageActionType , errorMessage: string |}
  ;

export const types = t;

export const resetMessage = (): Action => {
  return {
    type: t.RESET_MESSAGE
  };
};

export const setMessage = (errorMessage: string): Action => {
  return {
    type: t.SET_MESSAGE,
    errorMessage: errorMessage
  };
};
