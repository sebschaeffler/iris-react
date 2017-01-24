// @flow
import { addLocaleData, defineMessages } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';

export function setup() {
  addLocaleData([...en, ...fr]);
}

export function messageFunctionBuilder<K: Object>(_keys: K): (key: ($Keys<K>)) => Object {
  const keys: K = addIdToNestedMessages(_keys);
  const messageDescriptors = defineMessages(keys);

  return function (key: ($Keys<typeof _keys>)) {
    return messageDescriptors[key]
  }
}

function addIdToNestedMessages(nestedMessages: Object, parentKey: ?string = null, prefix: string = ''): any {
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
