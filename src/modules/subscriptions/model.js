import { Record } from 'immutable';

export class Subscription extends Record({
  id: '',
  name: '',
})
{
  getId() { return this.get('id'); }
  setId(id) { return this.set('id', id); }

  getName() { return this.get('name'); }
  setName(name) { return this.set('name', name); }
};

export class Subscriptions extends Record({
  list: []
})
{
  getList() { return this.get('list'); }
  setList(list) { return this.set('list', list); }

  add(subscription) { this.getList().push(subscription); }
  clear() { this.getList().splice(0); }
};
