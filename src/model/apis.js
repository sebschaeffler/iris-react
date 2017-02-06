import { Record } from 'immutable';

export default class Apis extends Record({
  list: []
})
{
  getList() { return this.get('list'); }
  setList(list) { return this.set('list', list); }

  add(api) { this.getList().push(api); }
  clear() { this.getList().splice(0); }
};
