import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import errors from './modules/errors';
import i18n from './modules/i18n';
import addApiReducer from './modules/addapi/reducer';
import appsReducer from './modules/apps/reducer';
import listapisReducer from './modules/listapis/reducer';
import subscriptionsReducer from './modules/listapis/reducer';

const rootReducer = combineReducers({
  addapi: addApiReducer,
  apps: appsReducer,
  listapis: listapisReducer,
  subscriptions: subscriptionsReducer,
  [errors.constants.NAME]: errors.reducer,
  [i18n.constants.NAME]: i18n.reducer,
  form: formReducer
});

export default rootReducer;
