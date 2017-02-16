import { normalize } from 'normalizr';
import _ from 'lodash';
import axios from 'axios';
import { API_CALL } from './model';
import { RequestType } from './model';

const ROOT_URL = process.env.REACT_APP_BACKEND_URL || '';

// Provides an easy way to create an action for this middleware to handle
export const createAction = (callInfo) => {
  return {
    type: API_CALL,
    callInfo
  };
};

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
 * Executes an HTTP request on the given endpoint
 * @param {RequestType} httpRequestType The HTTP Request type: GET, POST, etc...
 * @param {string} endpoint   The URL to send the request to
 * @param {object} parameters Optional JSON object representing the query string parameters
 * @param {object} schema     The schema to normalize the response to
 * @returns {Promise}         The promise backing the request
 */
function executeRequest(httpRequestType, endpoint, parameters, schema) {
  const params = parameters === null ? null : filterNil(parameters);

  //console.log("Params: ", httpRequestType, parameters);

  let url = `${ROOT_URL}/${endpoint}`;

  // If http request is not set try GET
  if (httpRequestType === null) {
    httpRequestType = RequestType.GET;
  }

  let request;
  switch (httpRequestType) {
    case RequestType.GET:
      if (params === null) {
        request = axios.get(url);
      } else {
        request = axios.get(url, {
          params
        });
      }
      break;
    case RequestType.POST:
      request = axios.post(url, {
        params
      });
      break;
    case RequestType.PATCH:
      if (params !== null) {
        request = axios.patch(url, {
          params
        });
      } else {
        throw new Error("ERROR while updating, parameters cannot be null");
      }
      break;
    case RequestType.PUT:
      if (params !== null) {
        request = axios.put(url, {
          params
        });
      } else {
        throw new Error("ERROR while updating, parameters cannot be null");
      }
      break;
    case RequestType.DELETE:
      request = axios.delete(url);
      break;
    default:
      break;
  }

  return new Promise((resolve, reject) => {
    request
      .then(response => ({ json: response.data, response }))
      .then(({ json, response }) => {
        resolve(httpRequestType === RequestType.GET ? normalize(json, schema) : response.data);
      }).catch(error => {
        const message = error.response ? error.response.data : error.message;
        console.log('ERROR', message);
        reject({ message });
      });
  });
}

// Middleware that interprets actions with callInfo property specified
const middleware = (store) => (next) => (action) => {

  //console.log("Action: ", action)

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
  if (!schema && (!httpRequestType || httpRequestType === RequestType.GET)) {
    throw new Error('Specify one of the exported Schemas')
  }
  if (!Array.isArray(actionTypes) || (httpRequestType !== RequestType.REDIRECT && actionTypes.length !== 3)) {
    throw new Error('Expected an array of three action types.')
  }
  if (!actionTypes.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  // Define function that builds new action with the given mutations
  function actionWith(mutations) {
    const newAction = Object.assign({}, action, mutations);
    delete newAction.callInfo; // remove API call info property
    return newAction;
  }

  const [requestType, successType, failureType] = actionTypes;

  // Dispatch "start request" action
  next(actionWith({ parameters, type: requestType }));

  if (httpRequestType === null || httpRequestType !== RequestType.REDIRECT) {
    return executeRequest(httpRequestType, endpoint, parameters, schema).then(
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
  }
};

export default middleware;
