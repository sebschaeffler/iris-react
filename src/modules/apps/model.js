import { Record } from 'immutable';

export class App extends Record({
  id: '',
  name: '',
  description: '',
  callback_url: '',
  status: 'Active'
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

  getStatus() { return this.get('status'); }
  setStatus(status) { return this.set('status', status); }
};

export class Apps extends Record({
  list: []
})
{
  getList() { return this.get('list'); }
  setList(list) { return this.set('list', list); }

  add(app) { this.getList().push(app); }
  clear() { this.getList().splice(0); }
};
