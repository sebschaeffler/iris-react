import * as types from './actionTypes';
import {Api, CRUDState} from '../../model';
import {State} from './stateRecord';

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
      // Clear api list
      state.get('list').clear();
      // Load expects either a list of results or a single result (which is not a singletonlist)
      if (response.entities !== null && response.entities.apis) {
        // Convert entities into an API
        const keys = Object.keys(response.entities.apis);
        if (keys.length === 1) {
          state = state.update('api', api => new Api(response.entities.apis[keys[0]]));
        }
        keys.map(key =>
          state.get('list').add(new Api(response.entities.apis[key]))
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
        .update('api', (values) =>
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
    // TOGGLE STATUS
    // ===================
    case types.TOGGLE_STATUS:
      const val = state.get('api').getStatus().toUpperCase() === 'Active'.toUpperCase() ? 'Disabled' : 'Active';
      return state
        .reset()
        .update('api', api => new Api(state.get('api').setStatus(val)))
        .set('CRUDState', new CRUDState().setToggleStatusSuccessful(true));

    // ===================
    // UPDATE
    // ===================
    case types.UPDATE:
      return state
        .reset()
        .set('isProcessing', true)
        .update('api', (values) =>
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
