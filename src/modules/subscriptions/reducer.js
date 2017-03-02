import {Record} from "immutable";
import * as types from "./actionTypes";
import {Subscription, Subscriptions} from './model';
import {CRUDState} from "../../model";

const StateRecord = new Record({
  subscription: new Subscription(), // for create or detail
  list: new Subscriptions(), // for retrieving list of subscriptions
  CRUDState: new CRUDState(),
  isProcessing: false,
  errors: null
});

class State extends StateRecord {
  reset() {
    return this.set('errors', null)
      .set('isProcessing', false)
      .set('CRUDState', new CRUDState())
      .set('subscription', new Subscription());
  }
}

const INITIAL_STATE = new State();

export default function (state = INITIAL_STATE, action) {
  const {parameters, response, errorMessage} = action;

  switch (action.type) {
    // ===================
    // LOAD
    // ===================
    case types.LOAD:
      return state
        .reset()
        .set('isProcessing', true);
    case types.LOAD_SUCCESS:
      // Clear api list
      state.reset();
      state.get('list').clear();
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
      // Set loadsuccessful
      return state
        .set('isProcessing', false)
        .set('CRUDState', new CRUDState().setLoadSuccessful(true));
    case types.LOAD_ERROR:
      return state
        .reset()
        .set('errors', errorMessage);

    // ===================
    // SUBMIT
    // ===================
    case types.SUBMIT:
      return state
        .reset()
        .set('isProcessing', true)
        .update('subscription', (values) =>
          parameters
        );
    case types.SUBMIT_SUCCESS:
      return state
        .reset()
        .set('CRUDState', new CRUDState().setSubmitSuccessful(true));
    case types.SUBMIT_ERROR:
      return state
        .reset()
        .set('errors', errorMessage);

    // ===================
    // RESET
    // ===================
    case types.RESET:
      return state
        .reset()
        .set('CRUDState', new CRUDState().setResetSuccessful(true));

    // ===================
    // UPDATE
    // ===================
    case types.UPDATE:
      return state
        .reset()
        .set('isProcessing', true)
        .update('subscription', (values) =>
          parameters
        );
    case types.UPDATE_SUCCESS:
      console.log("UPDATE: ", response);
      return state
        .reset()
        .set('CRUDState', new CRUDState().setUpdateSuccessful(true));
    case types.UPDATE_ERROR:
      return state
        .reset()
        .set('errors', errorMessage);

    // ===================
    // DELETE
    // ===================
    case types.DELETE:
      return state
        .reset()
        .set('isProcessing', true);
    case types.DELETE_SUCCESS:
      return state
        .reset()
        .set('CRUDState', new CRUDState().setDeleteSuccessful(true));
    case types.DELETE_ERROR:
      return state
        .reset()
        .set('errors', errorMessage);
    default:
      return state;
  }
}
