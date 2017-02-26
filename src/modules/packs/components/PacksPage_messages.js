import { messageFunctionBuilder } from '../../../i18n';

export const Keys = {
  SECTIONS_PACKS_TITLE: 'packs.sections.title',
  BUTTON_CREATE: 'packs.buttons.create',
  BUTTON_BACK_TO_LIST: 'packs.buttons.back',
  BUTTON_SUBMIT: 'packs.buttons.save',
}

const _keys = {
  [Keys.SECTIONS_PACKS_TITLE]: { defaultMessage: 'Explore the packs' },
  [Keys.BUTTON_CREATE]: { defaultMessage: 'New package' },
  [Keys.BUTTON_BACK_TO_LIST]: { defaultMessage: 'Back to the packs list' },
  [Keys.BUTTON_SUBMIT]: { defaultMessage: 'Save' }
};

// For imperative internationalisation
export default messageFunctionBuilder(_keys);
