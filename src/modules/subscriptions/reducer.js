import { Record } from 'immutable';
import * as types from './actionTypes';
import { Subscription, Subscriptions } from './model';

const StateRecord = new Record({
  subscription: new Subscription(), // for create or detail
  list: new Subscriptions(), // for retrieving list of subscriptions
  currentAction: null,
  isProcessing: false,
  isLoadSuccessful: false,
  isResetSuccessful: false,
  isSubmitSuccessful: false,
  isUpdateSuccessful: false,
  isDeleteSuccessful: false,
  errors: null
});

class State extends StateRecord {
}

const INITIAL_STATE = new State();

export default function (state = INITIAL_STATE, action) {
  const { parameters, response, errorMessage } = action;
  // Current action
  state = state.set('currentAction', action.type);
  switch (action.type) {
    case types.LOAD:
      return state
        .set('isProcessing', true)
        .set('isLoadSuccessful', false)
        .set('isResetSuccessful', false)
        .set('isSubmitSuccessful', false)
        .set('isUpdateSuccessful', false)
        .set('isDeleteSuccessful', false)
        .set('errors', null);
    case types.LOAD_SUCCESS:
      // Clear list
      state.get('list').clear();
      //console.log("Response: ", response)
      // Load expects either a list of results or a single result (which is not a singletonlist)
      if (response.entities !== null && response.entities.subscriptions) {
        // Convert entities into an subscription
        const keys = Object.keys(response.entities.subscriptions);
        if (keys.length === 1) {
          state = state.update('subscription', subscription => new Subscription(response.entities.subscriptions[keys[0]]));
        }
        keys.map(key =>
          state.get('list').add(new Subscription(response.entities.subscriptions[key]))
        );
      }
      // Return state
      return state
        .set('isProcessing', false)
        .set('isLoadSuccessful', true)
        .set('errors', null);
    case types.LOAD_ERROR:
      return state
        .set('isProcessing', false)
        .set('isLoadSuccessful', false)
        .set('errors', errorMessage);
    case types.SUBMIT:
      return state
        .set('isProcessing', true)
        .set('isLoadSuccessful', false)
        .set('isResetSuccessful', false)
        .set('isSubmitSuccessful', false)
        .set('isUpdateSuccessful', false)
        .set('isDeleteSuccessful', false)
        .set('errors', null)
        .update('subscription', (values) =>
          parameters
        );
    case types.SUBMIT_SUCCESS:
      return state
        .set('isProcessing', false)
        .set('isSubmitSuccessful', true)
        .set('errors', null);
    case types.SUBMIT_ERROR:
      return state
        .set('isProcessing', false)
        .set('isSubmitSuccessful', false)
        .set('errors', errorMessage);
    case types.RESET:
      return state
        .set('isProcessing', false)
        .set('isResetSuccessful', true)
        .set('isLoadSuccessful', false)
        .set('isSubmitSuccessful', false)
        .set('isUpdateSuccessful', false)
        .set('isDeleteSuccessful', false)
        .set('subscription', new Subscription());
    case types.UPDATE:
      return state
        .set('isProcessing', true)
        .set('isLoadSuccessful', false)
        .set('isResetSuccessful', false)
        .set('isSubmitSuccessful', false)
        .set('isUpdateSuccessful', false)
        .set('isDeleteSuccessful', false)
        .set('errors', null)
        .update('subscription', (values) =>
          parameters
        );
    case types.UPDATE_SUCCESS:
      return state
        .set('isProcessing', false)
        .set('isUpdateSuccessful', true)
        .set('subscription', new Subscription())
        .set('errors', null);
    case types.UPDATE_ERROR:
      return state
        .set('isProcessing', false)
        .set('isUpdateSuccessful', false)
        .set('errors', errorMessage);
    case types.DELETE:
      return state
        .set('isProcessing', true)
        .set('isLoadSuccessful', false)
        .set('isResetSuccessful', false)
        .set('isSubmitSuccessful', false)
        .set('isUpdateSuccessful', false)
        .set('isDeleteSuccessful', false)
        .set('errors', null);
    case types.DELETE_SUCCESS:
      return state
        .set('isProcessing', false)
        .set('isDeleteSuccessful', true)
        .set('subscription', new Subscription())
        .set('errors', null);
    case types.DELETE_ERROR:
      return state
        .set('isProcessing', false)
        .set('isDeleteSuccessful', false)
        .set('errors', errorMessage);
    default:
      return state;
  }
}
