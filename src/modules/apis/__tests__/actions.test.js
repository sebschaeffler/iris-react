import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as t from '../actionTypes';
import * as actions from '../actions';
import api from '../../../middleware/api';

const middleware = [thunk, api];
const mockStore = configureMockStore(middleware);

describe('accounts', () => {
  describe('async actions', () => {
    beforeEach(function () {
      moxios.install()
    });

    afterEach(function () {
      moxios.uninstall()
    });

    const moxiosEmptyStub = () => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: []
        });
      });
    };

    it('should create success action when querying apis has been done', () => {
      moxiosEmptyStub();
      const store = mockStore({});

      const expectedActions = [
        { type: t.LOAD, parameters: undefined },
        { type: t.LOAD_SUCCESS, parameters: undefined, response: { entities: {}, result: [] } }
      ];

      return store.dispatch(actions.loadApi()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(true);
      });
    });

  });
});
