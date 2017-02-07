import { messageFunctionBuilder } from '../../../i18n';

export const Keys = {
  SECTIONS_APIS_TITLE: 'apis.sections.title',
  SHARE_PRICES_PLACEHOLDER: 'apis.shareprices.placeholder',
  BUTTON_CREATE: 'apis.buttons.create',
  BUTTON_BACK_TO_LIST: 'apis.buttons.back',
  BUTTON_SUBMIT: 'apis.buttons.save',
}

const _keys = {
  [Keys.SECTIONS_APIS_TITLE]: { defaultMessage: 'Explore APIs' },
  [Keys.SHARE_PRICES_PLACEHOLDER]: { defaultMessage: 'e.g. Share Prices' },
  [Keys.BUTTON_CREATE]: { defaultMessage: 'New API' },
  [Keys.BUTTON_BACK_TO_LIST]: { defaultMessage: 'Back to APIs list' },
  [Keys.BUTTON_SUBMIT]: { defaultMessage: 'Save' }
};

// For imperative internationalisation
export default messageFunctionBuilder(_keys);
