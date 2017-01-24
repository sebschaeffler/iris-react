import * as actions from '../actions';
import * as t from '../actionTypes';

describe('errors', () => {
  describe('actions', () => {
    it('should create action to reset errors', () => {
      const expectedAction = {
        type: t.RESET_MESSAGE
      };
      expect(actions.resetMessage()).toEqual(expectedAction);
    });

    it('should create action to set the error message', () => {
      const errorMessage = 'Hello World';

      const expectedAction = {
        type: t.SET_MESSAGE,
        errorMessage: errorMessage
      };
      expect(actions.setMessage(errorMessage)).toEqual(expectedAction);
    });
  });
});
