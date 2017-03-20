/**
 * Created by sebastienschaeffler on 20/03/2017.
 */
import {Record} from 'immutable';
import {Api, Apis, CRUDState} from '../../model';

const StateRecord = new Record({
  api: new Api(), // for create or detail
  list: new Apis(), // for retrieving list of apis,
  CRUDState: new CRUDState(),
  isProcessing: false,
  errors: null
});

export class State extends StateRecord {
  reset() {
    return this.set('errors', null)
      .set('isProcessing', false)
      .set('CRUDState', new CRUDState())
      .set('api', new Api());
  }
}
