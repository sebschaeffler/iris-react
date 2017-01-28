import { messageFunctionBuilder } from '../../../i18n';

export const Keys = {
  SECTIONS_LIST_APIS_TITLE: 'listapis.sections.title',
  BUTTON_REFRESH: 'listapis.buttons.refresh',
}

const _keys = {
  [Keys.SECTIONS_LIST_APIS_TITLE]: { defaultMessage: 'Explore APIs' },
  [Keys.BUTTON_REFRESH]: { defaultMessage: 'Refresh' },
};

// For imperative internationalisation
export default messageFunctionBuilder(_keys);
