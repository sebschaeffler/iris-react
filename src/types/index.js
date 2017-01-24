// @flow
import type { Dispatch as ReduxDispatch } from 'redux';
import type { IntlShape } from 'react-intl';

// redux
type ReduxAction = { type: $Subtype<string> };

export type Thunk<A: ReduxAction> = (dispatch: Dispatch<A>) => any; //eslint-disable-line no-use-before-define
export type Dispatch<A: ReduxAction> =
  ReduxDispatch<ReduxAction>
  &
  (action: Thunk<A>) => any;

export type PropsWithDispatch<P> = P & { dispatch: Dispatch<*> };

// react-intl
export type PropsWithIntl<P> = P & { intl: IntlShape };

// redux-form
type SubmitHandler<FV> = (data: FV) => void | Promise<any>;
export type PropsWithReduxForm<P, FV> = P & {
  handleSubmit: (handler: SubmitHandler<FV>) => void | Promise<any>;
  initialize: (formValues: FV, keepDirty: boolean) => any
};

//Auth flow
export const ResponseType = {
  ACCESS_CODE: 'token',
  AUTH_CODE: 'auth'
};
export type AuthResponseType = $Keys<typeof ResponseType>;
