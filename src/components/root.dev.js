import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import { Router } from 'react-router';
import IntlWrapper from '../modules/i18n/components/IntlWrapper';
import DevTools from '../__dev__/dev_tools';

const Root = ({ store, history }) => {
  return (
    <Provider store={store}>
      <div>
        <IntlWrapper>
            <Router history={history} routes={ routes.getRoutes(store) } />
        </IntlWrapper>
        <DevTools />
      </div>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;
