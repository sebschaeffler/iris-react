// @flow
import { messageFunctionBuilder } from '../../i18n';

export const Keys = {
  PAGEHEADER_MESSAGES_YOUAREHERE: 'pageheader.messages.youarehere',
  PAGEHEADER_MESSAGES_HOME: 'pageheader.messages.home'
};

const _keys = {
  [Keys.PAGEHEADER_MESSAGES_YOUAREHERE]: { defaultMessage: 'You are here' },
  [Keys.PAGEHEADER_MESSAGES_HOME]: { defaultMessage: 'Home' }
};

export default messageFunctionBuilder(_keys);
