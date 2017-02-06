import * as a from './actionTypes';
import * as apiMiddleware from '../../middleware/api';
import { RequestType } from '../../middleware/api/model';

const API_URL = 'api';

export function submitRequest(params) {
  return {
    type: a.SUBMIT,
    params
  };
}

export function submitError(params) {
  return {
    type: a.SUBMIT_ERROR,
    params
  };
}

export function submitSuccess(response) {
  return dispatch => {
    dispatch({
      type: a.SUBMIT_SUCCESS,
      response
    });
  }
}

export function submitNewApi(params) {
  return dispatch => {
    dispatch(apiMiddleware.createAction({
        endpoint: API_URL,
        actionTypes: [a.SUBMIT, a.SUBMIT_SUCCESS, a.SUBMIT_ERROR],
        parameters: params,
        httpRequestType: RequestType.POST
      }));
  };
};
