import {State} from '../stateRecord';
import reducer from '../reducer';
import {Api, Apis, CRUDState} from "../../../model";

const buildState = (api = new Api(), // for create or detail
                    list = new Apis(), // for retrieving list of apis,
                    CRUDState = new CRUDState(),
                    isProcessing = false,
                    errors = null) => {

  return new State();
};

const buildImmutableStateAsJSON = (api = new Api(), // for create or detail
                                   list = new Apis(), // for retrieving list of apis,
                                   crudState = new CRUDState(),
                                   isProcessing = false,
                                   errors = null) => {
  return buildState(api, list, crudState, isProcessing, errors).toJSON();
}


describe('apis', () => {
  describe('reducer', () => {

    it('should return the initial state', () => {
      const expectedInitialStateInJSON = buildImmutableStateAsJSON();
      expect(reducer(undefined, {}).toJSON()).toEqual(expectedInitialStateInJSON);
    });

  });
});
