// @flow
import { messageFunctionBuilder } from '../../../i18n';

export const Keys = {
  SECTIONS_DASHBOARD_TITLE: 'dashboard.sections.dashboard.title',
  SECTIONS_INDICATORS_TITLE: 'dashboard.sections.indicators.title',
  SECTIONS_MONITOR_TITLE: 'dashboard.sections.monitor.title',
  WIDGETS_BUTTONS_VIEWDETAILS_TITLE: 'dashboard.widgets.buttons.viewdetails.title',
  WIDGETS_TASKS_TITLE: 'dashboard.widgets.tasks.title',
  WIDGETS_DEADLINE_TITLE: 'dashboard.widgets.deadline.title',
  WIDGETS_MESSAGES_TITLE: 'dashboard.widgets.messages.title',
  WIDGETS_UNMATCHED_TITLE: 'dashboard.widgets.unmatched.title',
  WIDGETS_NEGATIVEBALANCE_TITLE: 'dashboard.widgets.negativebalance.title',
  WIDGETS_ACCOUNTS_TITLE: 'dashboard.widgets.accounts.title',
  WIDGETS_MONITOR_MESSAGES_FAVOURITEACCOUNTNOTSELECTED: 'dashboard.widgets.monitor.messages.favouriteaccountnotselected',
  WIDGETS_MONITOR_BUTTONS_REFRESH_TITLE: 'dashboard.widgets.monitor.buttons.refresh.title',
  WIDGETS_MONITOR_BUTTONS_SWITCHACCOUNT_TITLE: 'dashboard.widgets.monitor.buttons.switchaccount.title',
  WIDGETS_MONITOR_MESSAGES_BALANCESFORACCOUNTNAME: 'dashboard.widgets.monitor.messages.balancesforaccountname',
  WIDGETS_MONITOR_MESSAGES_BALANCESFORACCOUNT: 'dashboard.widgets.monitor.messages.balancesforaccount',
  WIDGETS_MONITOR_BALANCEAXIS_TITLE: 'dashboard.widgets.monitor.balanceaxis.title'
}

const _keys = {
  [Keys.SECTIONS_DASHBOARD_TITLE]: { defaultMessage: 'Dashboard' },
  [Keys.SECTIONS_INDICATORS_TITLE]: { defaultMessage: 'Indicators' },
  [Keys.SECTIONS_MONITOR_TITLE]: { defaultMessage: 'My monitor' },
  [Keys.WIDGETS_BUTTONS_VIEWDETAILS_TITLE]: { defaultMessage: 'View Details' },
  [Keys.WIDGETS_TASKS_TITLE]: { defaultMessage: 'Pending Tasks' },
  [Keys.WIDGETS_DEADLINE_TITLE]: { defaultMessage: 'Cash Deadline' },
  [Keys.WIDGETS_MESSAGES_TITLE]: { defaultMessage: 'Unread messages' },
  [Keys.WIDGETS_UNMATCHED_TITLE]: { defaultMessage: '{currency} Unmatched instructions' },
  [Keys.WIDGETS_NEGATIVEBALANCE_TITLE]: { defaultMessage: 'Negative balance' },
  [Keys.WIDGETS_ACCOUNTS_TITLE]: { defaultMessage: 'Accounts' },
  [Keys.WIDGETS_MONITOR_MESSAGES_FAVOURITEACCOUNTNOTSELECTED]: { defaultMessage: 'Please select your favorite account.' },
  [Keys.WIDGETS_MONITOR_BUTTONS_REFRESH_TITLE]: { defaultMessage: 'Refresh' },
  [Keys.WIDGETS_MONITOR_BUTTONS_SWITCHACCOUNT_TITLE]: { defaultMessage: '(Switch account)' },
  [Keys.WIDGETS_MONITOR_MESSAGES_BALANCESFORACCOUNTNAME]: { defaultMessage: 'Cash balances for {name}' },
  [Keys.WIDGETS_MONITOR_MESSAGES_BALANCESFORACCOUNT]: { defaultMessage: 'Cash balances for {name} ({account})' },
  [Keys.WIDGETS_MONITOR_BALANCEAXIS_TITLE]: { defaultMessage: ' Values' }
};

// For imperative internationalisation
export default messageFunctionBuilder(_keys);
