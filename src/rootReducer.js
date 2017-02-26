import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form/immutable';
import errors from './modules/errors';
import i18n from './modules/i18n';
import apisReducer from './modules/apis/reducer';
import appsReducer from './modules/apps/reducer';
import packsReducer from './modules/packs/reducer';
import subscriptionsReducer from './modules/subscriptions/reducer';

const rootReducer = combineReducers({
  apps: appsReducer,
  apis: apisReducer,
  packs: packsReducer,
  subscriptions: subscriptionsReducer,
  [errors.constants.NAME]: errors.reducer,
  [i18n.constants.NAME]: i18n.reducer,
  form: formReducer
});

export default rootReducer;
