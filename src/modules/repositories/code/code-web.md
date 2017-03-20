## Sample code

<img src="http://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark-700x235.png" width="250px"/>

### Writing a web application with modern language: React (from Facebook)

This sample shows you how to implement a simple method that handles five different HTTP request methods (i.e. GET, POST, PUT, PATCH and DELETE).

```js
const ROOT_URL = process.env.REACT_APP_BACKEND_URL || '';

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
        //console.log("Params: ", params);
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
```

Please click on the following picture to access the complete source code: <a href="https://github.com/bidispot/dbp-consent-app" target="_new"><img src="https://2.bp.blogspot.com/-G9Q82BxIPHo/VzWZqS3vnZI/AAAAAAAAAYE/v5xHnpVtVhkZlNIsV9ObeuniNoBz-t5DQCLcB/s320/github-bb449e0ffbacbcb7f9c703db85b1cf0b.png" /></a>
