import { messageFunctionBuilder } from '../../../i18n';

export const Keys = {
  SECTIONS_ADD_API_TITLE: 'addapi.sections.addapi.title',
  SHARE_PRICES_PLACEHOLDER: 'addapi.shareprices.placeholder',
  BUTTON_CREATE: 'addapi.buttons.save',
}

const _keys = {
  [Keys.SECTIONS_ADD_API_TITLE]: { defaultMessage: 'Add a new API' },
  [Keys.SHARE_PRICES_PLACEHOLDER]: { defaultMessage: 'e.g. Share Prices' },
  [Keys.BUTTON_CREATE]: { defaultMessage: 'Save' },
};

// For imperative internationalisation
export default messageFunctionBuilder(_keys);
