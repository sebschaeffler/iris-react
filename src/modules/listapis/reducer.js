import * as types from './actionTypes';
import * as apis from '../../model/apis';

const INITIAL_STATE = new apis.Apis();

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOAD_DEFAULT_VALUES:
      return state;
    case types.SUBMIT:
      return state;
    default:
      return state;
  }
}
