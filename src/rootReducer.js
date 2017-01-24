// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import errors from './modules/errors';
import i18n from './modules/i18n';

const rootReducer = combineReducers({
  [errors.constants.NAME]: errors.reducer,
  [i18n.constants.NAME]: i18n.reducer,
  form: formReducer
});

export default rootReducer;
