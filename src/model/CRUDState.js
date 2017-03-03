/**
 * Created by sebastienschaeffler on 25/02/2017.
 */
import {Record} from "immutable";

export default class CRUDState extends Record({
  isLoadSuccessful: false,
  isResetSuccessful: false,
  isSubmitSuccessful: false,
  isUpdateSuccessful: false,
  isDeleteSuccessful: false,
  isToggleStatusSuccessful: false
}){
  isLoadSuccessful() { return this.get('isLoadSuccessful'); }
  setLoadSuccessful(isLoadSuccessful) { return this.set('isLoadSuccessful', isLoadSuccessful); }

  isResetSuccessful() { return this.get('isResetSuccessful'); }
  setResetSuccessful(isResetSuccessful) { return this.set('isResetSuccessful', isResetSuccessful); }

  isSubmitSuccessful() { return this.get('isSubmitSuccessful'); }
  setSubmitSuccessful(isSubmitSuccessful) { return this.set('isSubmitSuccessful', isSubmitSuccessful); }

  isUpdateSuccessful() { return this.get('isUpdateSuccessful'); }
  setUpdateSuccessful(isUpdateSuccessful) { return this.set('isUpdateSuccessful', isUpdateSuccessful); }

  isDeleteSuccessful() { return this.get('isDeleteSuccessful'); }
  setDeleteSuccessful(isDeleteSuccessful) { return this.set('isDeleteSuccessful', isDeleteSuccessful); }

  isToggleStatusSuccessful() { return this.get('isToggleStatusSuccessful'); }
  setToggleStatusSuccessful(isToggleStatusSuccessful) { return this.set('isToggleStatusSuccessful', isToggleStatusSuccessful); }
};
