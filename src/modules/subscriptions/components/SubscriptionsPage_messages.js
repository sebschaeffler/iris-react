import { messageFunctionBuilder } from '../../../i18n';

export const Keys = {
  SECTIONS_SUBSCRIPTIONS_TITLE: 'subscriptions.sections.title',
  BUTTON_CREATE: 'subscriptions.buttons.create',
  BUTTON_BACK_TO_LIST: 'subscriptions.buttons.back',
  BUTTON_SUBMIT: 'subscriptions.buttons.save',
}

const _keys = {
  [Keys.SECTIONS_SUBSCRIPTIONS_TITLE]: { defaultMessage: 'My subscriptions' },
  [Keys.BUTTON_CREATE]: { defaultMessage: 'New subscription' },
  [Keys.BUTTON_BACK_TO_LIST]: { defaultMessage: 'Back' },
  [Keys.BUTTON_SUBMIT]: { defaultMessage: 'Save' }
};

// For imperative internationalisation
export default messageFunctionBuilder(_keys);
