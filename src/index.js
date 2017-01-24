import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import configureStore from './store';
import Root from './components/root';
import { setup as i18nSetup } from './i18n';
import './style/react-bootstrap-table-all.min.css'; // version 2.5.2
import './style/font-awesome.min.css'
import './style/style.css';
import './style/normalize.css';

i18nSetup();
const store = configureStore();

ReactDOM.render(
  <Root store={store} history={browserHistory} />,
  document.getElementById('root')
);
