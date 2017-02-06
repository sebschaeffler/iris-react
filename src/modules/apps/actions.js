import * as a from './actionTypes';
import * as apiMiddleware from '../../middleware/api';
import { RequestType } from '../../middleware/api/model';
import { Schemas } from '../../normalizer';

const APP_URL = 'app';

export function load(params) {
  return dispatch => {
    dispatch(apiMiddleware.createAction({
        endpoint: APP_URL,
        actionTypes: [a.LOAD, a.LOAD_SUCCESS, a.LOAD_ERROR],
        parameters: params,
        schema: Schemas.APP_ARRAY,
        httpRequestType: RequestType.GET
      }));
  };
};

export function submitNewApp(params) {
  return dispatch => {
    dispatch(apiMiddleware.createAction({
        endpoint: APP_URL,
        actionTypes: [a.SUBMIT, a.SUBMIT_SUCCESS, a.SUBMIT_ERROR],
        parameters: params,
        httpRequestType: RequestType.POST
      }));
  };
};
