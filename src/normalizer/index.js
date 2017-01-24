// @flow
import { Schema, arrayOf } from 'normalizr';

const balanceSchema = new Schema('balances', { idAttribute: 'id' });
const accountSchema = new Schema('accounts', { idAttribute: 'id' });

export const Schemas = {
  BALANCE: balanceSchema,
  BALANCE_ARRAY: arrayOf(balanceSchema),
  ACCOUNTS: accountSchema,
  ACCOUNT_ARRAY: arrayOf(accountSchema)
};

export interface NormalizedSuccessfulResponse<AccountT, AccountK, BalanceT, BalanceK> {
  entities: {
    accounts?: {[_: AccountK]: AccountT},
    balances?: {[_: BalanceK]: BalanceT}
  },
  result: Array<AccountK> | Array<BalanceK>;
};

export interface NormalizedFailedResponse {
  errorMessage: string
};
