import { messageFunctionBuilder } from '../../../i18n';

export const Keys = {
  SECTIONS_DASHBOARD_TITLE: 'dashboard.sections.dashboard.title',
  SECTIONS_GETTING_STARTED_TITLE: 'dashboard.sections.gettingstarted.title',
  SECTIONS_APIS_TITLE: 'dashboard.sections.apis.title',
}

const _keys = {
  [Keys.SECTIONS_DASHBOARD_TITLE]: { defaultMessage: 'Dashboard' },
  [Keys.SECTIONS_GETTING_STARTED_TITLE]: { defaultMessage: 'Getting started' },
  [Keys.SECTIONS_APIS_TITLE]: { defaultMessage: 'My APIs' },
};

// For imperative internationalisation
export default messageFunctionBuilder(_keys);
