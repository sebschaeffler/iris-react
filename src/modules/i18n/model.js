import * as I from 'immutable';

export class ImmutableState extends I.Record({
  locale: 'en'
}) {
  getLocale() { return this.get('locale'); }
  setLocale(locale) { return this.set('locale', locale); }
}
