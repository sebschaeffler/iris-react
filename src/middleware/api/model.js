// @flow
export type APICallInfo = {|
  actionTypes: Array<string>,
  endpoint: string,
  parameters: Object,
  schema: Normalizr$Schema
|};

// Defines the type that actions need to have in order to be handled by the middleware
export const API_CALL: 'api/API_CALL' = 'api/API_CALL';
type APICallActionType = typeof API_CALL;

export const RequestType = {
  GET: 'GET',
  POST: 'POST',
  REDIRECT: 'REDIRECT'
};
export type HttpRequestType = $Keys<typeof requestType>;

// Action can either be one intended for the middleware or some other type of action
export type Action = {| type: APICallActionType, callInfo: APICallInfo |}
export type AnyAction =
  Action
  | { type: any }
  ;
