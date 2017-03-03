import { Record } from 'immutable';

export class Pack extends Record({
  id: '',
  name: '',
  description: '',
  callback_url: '',
  rating: 0,
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

  getRating() { return this.get('rating'); }
  setRating(rating) { return this.set('rating', rating); }

  getStatus() { return this.get('status'); }
  setStatus(status) { return this.set('status', status); }
};

export class Packs extends Record({
  list: []
})
{
  getList() { return this.get('list'); }
  setList(list) { return this.set('list', list); }

  add(app) { this.getList().push(app); }
  clear() { this.getList().splice(0); }
};
