import React from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import IntlWrapper from '../modules/i18n/components/IntlWrapper';
import { Router } from 'react-router';

const Root = ({ store, history }) => (
  <Provider store={store}>
    <IntlWrapper>
      <Router history={history} routes={routes.getRoutes(store)} />
    </IntlWrapper>
  </Provider>
);

export default Root;
