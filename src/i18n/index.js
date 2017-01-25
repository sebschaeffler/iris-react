import { addLocaleData, defineMessages } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

export function setup() {
  addLocaleData([...en, ...fr]);
}

export function messageFunctionBuilder(_keys) {
  const keys = addIdToNestedMessages(_keys);
  const messageDescriptors = defineMessages(keys);

  return function (key) {
    return messageDescriptors[key]
  }
}

function addIdToNestedMessages(nestedMessages, parentKey = null, prefix = '') {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    let value = nestedMessages[key];

    if (typeof value === 'string') {
      if (parentKey) {
        const newLeaf = Object.assign({}, nestedMessages, { id: prefix });
        Object.assign(messages, { [parentKey]: newLeaf });
      }
    } else {
      const prefixedKey = prefix ? `${prefix}.${key}` : key;
      if (!parentKey) {
        Object.assign(messages, addIdToNestedMessages(value, key, prefixedKey));
      } else {
        Object.assign(messages, { [parentKey]: addIdToNestedMessages(value, key, prefixedKey) });
      }
    }

    return messages;
  }, {});
};
