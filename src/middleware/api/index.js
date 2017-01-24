// @flow
import { normalize } from 'normalizr';
import _ from 'lodash';
import axios from 'axios';
import { API_CALL } from './model';
import type { APICallInfo, AnyAction, Action } from './model';
import { RequestType } from './model';

const ROOT_URL = process.env.REACT_APP_BACKEND_URL || '';

// Provides an easy way to create an action for this middleware to handle
export const createAction = (callInfo: APICallInfo): Action => {
  return {
    type: API_CALL,
    callInfo
  };
};

// for convenience
export type APIAction = Action;

/**
 * Removes (sub-)properties with null or undefined values from a given JSON object
 * @param  {object} jsonObject  A JSON object with some potentially null or underfined (sub-)properties
 * @returns {object}            A new JSON object where (sub-)properties with undefined or null values have been
 *                                removed.
 */
function filterNil(jsonObject) {
  return _.omitBy(jsonObject, _.isNil);
}

/**
 * Executes an HTTP GET request on the given endpoint
 * @param {string} endpoint   The URL to send the request to
 * @param {object} parameters Optional JSON object representing the query string parameters
 * @param {object} schema     The schema to normalize the response to
 * @returns {Promise}         The promise backing the request
 */
function callGet(endpoint: string, parameters: Object, schema: Normalizr$Schema): Promise<any> {
  const queryParams = filterNil(parameters);
  const url = `${ROOT_URL}/${endpoint}`;

  let request;
  if (queryParams === null) {
    request = axios.get(url);
  } else {
    request = axios.get(url, {
      params: queryParams
    });
  }

  return new Promise((resolve, reject) => {
    request
      .then(response => ({ json: response.data, response }))
      .then(({ json, response }) => {
        resolve(normalize(json, schema));
      }).catch(error => {
        const message = error.response ? error.response.data : error.message;
        reject({ message });
      });
  });
}

function callPost(endpoint: string, parameters: Object): Promise<any> {
  const formParams = filterNil(parameters);

  let request;
  if (parameters === null) {
    request = axios.post(endpoint);
  } else {
    request = axios.post(endpoint, {
      params: formParams
    });
  }

  return new Promise((resolve, reject) => {
    request
      .then(response => {
        resolve(response.data);
      }).catch(error => {
        const message = error.response ? error.response.data : error.message;
        console.log('ERROR', message);
        reject({ message });
      });
  });
}

// Middleware that interprets actions with callInfo property specified
const middleware: any = (store: any) => (next: any) => (action: any) => {
  // Don't do anything if the action is not for us, i.e. call next dispatch method
  if (action.type !== API_CALL || action.callInfo == null) {
    return next(action);
  }

  // Get the different API call elements
  const { endpoint, parameters, schema, actionTypes, httpRequestType } = action.callInfo;

  // Validate given elements
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema && !httpRequestType) {
    throw new Error('Specify one of the exported Schemas')
  }
  if (!Array.isArray(actionTypes) || (httpRequestType !== RequestType.REDIRECT && actionTypes.length !== 3)) {
    throw new Error('Expected an array of three action types.')
  }
  if (!actionTypes.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  // Define function that builds new action with the given mutations
  function actionWith(mutations): AnyAction {
    const newAction = Object.assign({}, action, mutations);
    delete newAction.callInfo; // remove API call info property
    return newAction;
  }

  const [requestType, successType, failureType] = actionTypes;

  // Dispatch "start request" action
  next(actionWith({ parameters, type: requestType }));

  if (httpRequestType !== null && httpRequestType === RequestType.POST) {
    return callPost(endpoint, parameters).then(
      response => {
        // Dispatch "success" action
        return next(actionWith({
          parameters,
          response,
          type: successType
        }));
      },
      error => {
        // Dispatch "failure" action
        return next(actionWith({
          parameters,
          response: { errorMessage: error.message || 'Unexpected error' },
          type: failureType,
        }));
      }
    );
  } else if (httpRequestType !== null && httpRequestType === RequestType.REDIRECT) {
    // redirect browser user agent
    window.location = endpoint;
    //console.log("Redirection to...", endpoint);
  } else {
    // GET by default
    return callGet(endpoint, parameters, schema).then(
      response => {
        // Dispatch "success" action
        return next(actionWith({
          parameters,
          response,
          type: successType
        }));
      },
      error => {
        // Dispatch "failure" action
        return next(actionWith({
          parameters,
          response: { errorMessage: error.message || 'Unexpected error' },
          type: failureType,
        }));
      }
    );
  }
};

export default middleware;
