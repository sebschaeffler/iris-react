import { Record } from 'immutable';

export class Subscription extends Record({
  name: '',
})
{
  getName() { return this.get('name'); }
  setName(name) { return this.set('name', name); }

};
