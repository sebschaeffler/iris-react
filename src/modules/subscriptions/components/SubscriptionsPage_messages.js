import { messageFunctionBuilder } from '../../../i18n';

export const Keys = {
  SECTIONS_SUBSCRIPTIONS_TITLE: 'subscriptions.sections.title',
}

const _keys = {
  [Keys.SECTIONS_SUBSCRIPTIONS_TITLE]: { defaultMessage: 'My subscriptions' },
};

// For imperative internationalisation
export default messageFunctionBuilder(_keys);
