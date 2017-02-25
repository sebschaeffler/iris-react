import { Record } from 'immutable';

export class Subscription extends Record({
  id: null,
  name: '',
  description: '',
  status: '',
  apis: null,
  app_id: null
})
{
  getId() { return this.get('id'); }
  setId(id) { return this.set('id', id); }

  getName() { return this.get('name'); }
  setName(name) { return this.set('name', name); }

  getDescription() { return this.get('description'); }
  setDescription(description) { return this.set('description', description); }

  getStatus() { return this.get('status'); }
  setStatus(status) { return this.set('status', status); }

  getApis() { return this.get('apis'); }
  setApis(apis) { return this.set('apis', apis); }

  getAppId() { return this.get('app_id'); }
  setAppId(app_id) { return this.set('app_id', app_id); }
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
