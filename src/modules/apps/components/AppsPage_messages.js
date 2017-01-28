import { messageFunctionBuilder } from '../../../i18n';

export const Keys = {
  SECTIONS_APPS_TITLE: 'apps.sections.title',
}

const _keys = {
  [Keys.SECTIONS_APPS_TITLE]: { defaultMessage: 'My aplications' },
};

// For imperative internationalisation
export default messageFunctionBuilder(_keys);
