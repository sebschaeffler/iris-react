import { messageFunctionBuilder } from '../../../i18n';

export const Keys = {
  SECTIONS_APPS_TITLE: 'apps.sections.title',
  BUTTON_CREATE: 'apps.buttons.create',
  BUTTON_BACK_TO_LIST: 'apps.buttons.back',
  BUTTON_SUBMIT: 'apps.buttons.save',
}

const _keys = {
  [Keys.SECTIONS_APPS_TITLE]: { defaultMessage: 'My aplications' },
  [Keys.BUTTON_CREATE]: { defaultMessage: 'New application' },
  [Keys.BUTTON_BACK_TO_LIST]: { defaultMessage: 'Back to application list' },
  [Keys.BUTTON_SUBMIT]: { defaultMessage: 'Save' }
};

// For imperative internationalisation
export default messageFunctionBuilder(_keys);
