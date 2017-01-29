import * as types from './actionTypes';
import * as api from '../../model/api';

const INITIAL_STATE = new api.Api();

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
