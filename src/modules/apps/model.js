import { Record } from 'immutable';

export class App extends Record({
  id: '',
  name: '',
})
{
  getId() { return this.get('id'); }
  setId(id) { return this.set('id', id); }

  getName() { return this.get('name'); }
  setName(name) { return this.set('name', name); }
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
