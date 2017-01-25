import * as I from 'immutable';

export class ImmutableState extends I.Record({
  message: null
}) {
  getMessage() { return this.get('message'); }
  setMessage(message) { return this.set('message', message); }
};
