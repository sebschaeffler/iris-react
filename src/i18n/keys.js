import { messageFunctionBuilder } from './index';

export const APP_VALUES_CURRENCIES_PREFIX = `app.values.currencies.`;

export const Keys = {
  APP_TITLE: 'app.title',
  PAGES_DASHBOARD: 'app.pages.dashboard',
  PAGES_EXPLORE_APIS: 'app.pages.apilist',
  PAGES_ADD_NEW_API: 'app.pages.apicreate',
  PAGES_MY_APPLICATIONS: 'app.pages.myapplications',
  PAGES_MY_SUBSCRIPTIONS: 'app.pages.mysubscriptions',
  PAGES_MY_PROFILE: 'app.pages.myprofile',
  PAGES_MONITORING: 'app.pages.monitoring',
  VIEWS_QUERY_HEADER_TITLE: 'app.views.query.header.title',
  VIEWS_QUERY_BUTTONS_QUERY: 'app.views.query.buttons.query',
  VIEWS_QUERY_BUTTONS_REFRESH: 'app.views.query.buttons.refresh',
  VIEWS_BUTTONS_RESET: 'app.views.buttons.reset',
  VIEWS_BUTTONS_EDIT: 'app.views.buttons.edit',
  VIEWS_BUTTONS_CANCEL: 'app.views.buttons.cancel',
  VIEWS_BUTTONS_DELETE: 'app.views.buttons.delete',
  VIEWS_LIST_HEADER_TITLE: 'app.views.list.header.title',
  VIEWS_LIST_MESSAGES_NORESULTS: 'app.views.list.messages.noresults',
  VIEWS_POPUP_BUTTONS_CLOSE: 'app.views.popup.buttons.close',
  VALUES_CURRENCIES_ALL: `${APP_VALUES_CURRENCIES_PREFIX}all`,
  VALUES_CURRENCIES_EUR: `${APP_VALUES_CURRENCIES_PREFIX}eur`,
  VALUES_CURRENCIES_USD: `${APP_VALUES_CURRENCIES_PREFIX}usd`,
  VALUES_CURRENCIES_GBP: `${APP_VALUES_CURRENCIES_PREFIX}gbp`,
  VALUES_CURRENCIES_JPY: `${APP_VALUES_CURRENCIES_PREFIX}jpy`
}

const _keys = {
  [Keys.APP_TITLE]: { defaultMessage: 'Digital Business Platform' },
  [Keys.PAGES_DASHBOARD]: { defaultMessage: 'Dashboard' },
  [Keys.PAGES_EXPLORE_APIS]: { defaultMessage: 'Explore APIs' },
  [Keys.PAGES_ADD_NEW_API]: { defaultMessage: 'Add new API' },
  [Keys.PAGES_MY_APPLICATIONS]: { defaultMessage: 'My applications' },
  [Keys.PAGES_MY_SUBSCRIPTIONS]: { defaultMessage: 'My subscriptions' },
  [Keys.PAGES_MY_PROFILE]: { defaultMessage: 'My profile' },
  [Keys.PAGES_MONITORING]: { defaultMessage: 'Monitoring' },
  [Keys.VIEWS_QUERY_HEADER_TITLE]: { defaultMessage: 'Query' },
  [Keys.VIEWS_QUERY_BUTTONS_QUERY]: { defaultMessage: 'Query' },
  [Keys.VIEWS_QUERY_BUTTONS_REFRESH]: { defaultMessage: 'app.views.query.buttons.refresh' },
  [Keys.VIEWS_BUTTONS_RESET]: { defaultMessage: 'Reset' },
  [Keys.VIEWS_BUTTONS_EDIT]: { defaultMessage: 'Edit' },
  [Keys.VIEWS_BUTTONS_CANCEL]: { defaultMessage: 'Cancel' },
  [Keys.VIEWS_BUTTONS_DELETE]: { defaultMessage: 'Delete' },
  [Keys.VIEWS_LIST_HEADER_TITLE]: { defaultMessage: 'List' },
  [Keys.VIEWS_LIST_MESSAGES_NORESULTS]: { defaultMessage: 'No rows available' },
  [Keys.VIEWS_POPUP_BUTTONS_CLOSE]: { defaultMessage: 'Close' },
  [Keys.VALUES_CURRENCIES_ALL]: { defaultMessage: 'All' },
  [Keys.VALUES_CURRENCIES_EUR]: { defaultMessage: 'EUR' },
  [Keys.VALUES_CURRENCIES_USD]: { defaultMessage: 'USD' },
  [Keys.VALUES_CURRENCIES_GBP]: { defaultMessage: 'GBP' },
  [Keys.VALUES_CURRENCIES_JPY]: { defaultMessage: 'JPY' }
};

export default messageFunctionBuilder(_keys);
