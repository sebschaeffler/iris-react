// @flow
import { NAME } from './constants';
import { ImmutableState } from './model';

const errorsBranchOf = (rootState: any): ImmutableState => rootState[NAME];

export const getMessage = (rootState: any) => errorsBranchOf(rootState).getMessage();
