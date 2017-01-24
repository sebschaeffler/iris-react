// @flow
import * as I from 'immutable';

export class ImmutableState extends I.Record({
  message: null
}) {
  message: ?string;

  getMessage(): ?string { return this.get('message'); }
  setMessage(message: ?string): this { return this.set('message', message); }
};
