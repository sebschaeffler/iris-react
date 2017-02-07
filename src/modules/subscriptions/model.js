import { Record } from 'immutable';

export class Subscription extends Record({
  id: '',
  name: '',
  description: '',
  callback_url: ''
})
{
  getId() { return this.get('id'); }
  setId(id) { return this.set('id', id); }

  getName() { return this.get('name'); }
  setName(name) { return this.set('name', name); }

  getDescription() { return this.get('description'); }
  setDescription(description) { return this.set('description', description); }

  getCallbackUrl() { return this.get('callback_url'); }
  setCallbackUrl(callback_url) { return this.set('callback_url', callback_url); }
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
