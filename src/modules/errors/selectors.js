import { NAME } from './constants';

const errorsBranchOf = (rootState) => rootState[NAME];

export const getMessage = (rootState) => errorsBranchOf(rootState).getMessage();
