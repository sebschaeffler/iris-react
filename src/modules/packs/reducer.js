import { Record } from "immutable";
import * as types from "./actionTypes";
import { Pack, Packs } from './model';
import { CRUDState } from "../../model";

const StateRecord = new Record({
  pack: new Pack(), // for create or detail
  list: new Packs(), // for retrieving list of packs,
  CRUDState: new CRUDState(),
  isProcessing: false,
  errors: null
});

class State extends StateRecord {
  reset() {
    return this.set('errors', null)
      .set('isProcessing', false)
      .set('CRUDState', new CRUDState())
      .set('pack', new Pack());
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
      state.reset();
      // Clear pack list
      state.get('list').clear();
      // Load expects either a list of results or a single result (which is not a singletonlist)
      if (response.entities !== null && response.entities.packs) {
        // Convert entities into an pack
        const keys = Object.keys(response.entities.packs);
        if (keys.length === 1) {
          state = state.update('pack', pack => new Pack(response.entities.packs[keys[0]]));
        }
        keys.map(key =>
          state.get('list').add(new Pack(response.entities.packs[key]))
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
        .update('pack', (values) =>
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
        .update('pack', (values) =>
          parameters
        );
    case types.UPDATE_SUCCESS:
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
