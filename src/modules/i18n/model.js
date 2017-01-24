// @flow
import * as I from 'immutable';

export class ImmutableState extends I.Record({
  locale: 'en'
}) {
  locale: string;

  getLocale(): string { return this.get('locale'); }
  setLocale(locale: string): this { return this.set('locale', locale); }
}
