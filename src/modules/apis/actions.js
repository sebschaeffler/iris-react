import * as a from './actionTypes';
import * as apiMiddleware from '../../middleware/api';
import { RequestType } from '../../middleware/api/model';
import { Schemas } from '../../normalizer';

const API_URL = 'api';

export function loadApi(params) {
  return dispatch => {
    var url = API_URL;
    if (params && params.id) {
      url += `/${params.id}`;
    }
    //console.log("Load: ", url, " with: ", params)
    dispatch(apiMiddleware.createAction({
      endpoint: url,
      actionTypes: [a.LOAD, a.LOAD_SUCCESS, a.LOAD_ERROR],
      parameters: params,
      schema: Schemas.API_ARRAY,
      httpRequestType: RequestType.GET
    }));
  };
};

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

export function resetApi() {
  return {
    type: a.RESET
  };
};

export function toggleStatus() {
  return {
    type: a.TOGGLE_STATUS
  };
};

export function updateApi(params) {
  if (params === null || params.id === '') {
    throw new Error("ERROR while updating 'id' is mandatory");
  }
  return dispatch => {
    dispatch(apiMiddleware.createAction({
      endpoint: `${API_URL}/${params.id}`,
      actionTypes: [a.UPDATE, a.UPDATE_SUCCESS, a.UPDATE_ERROR],
      parameters: params,
      httpRequestType: RequestType.PATCH
    }));
  };
}

export function deleteApi(id) {
  if (id === null || !Number.isInteger(id)) {
    throw new Error("ERROR while deleting: 'id' is mandatory and needs to be an integer, instead id = ", id);
  }
  return dispatch => {
    dispatch(apiMiddleware.createAction({
      endpoint: `${API_URL}/${id}`,
      actionTypes: [a.DELETE, a.DELETE_SUCCESS, a.DELETE_ERROR],
      parameters: null,
      httpRequestType: RequestType.DELETE
    }));
  };
}
