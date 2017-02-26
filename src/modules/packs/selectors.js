import { createSelector } from 'reselect';
import { NAME } from './constants';

const stateFrom = (rootState) => rootState[NAME];

const getAll = (rootState) => stateFrom(rootState).getEntities();
const getQuery = (rootState) => stateFrom(rootState).getQuery();
const getQueryResultIds = (rootState) => getQuery(rootState).getResultIDs();

// Memoized selector that receives the state as argument and returns the list of
// Apis objects representing the Apis query results.
export const getQueryResults = createSelector(
  [getAll, getQueryResultIds],
  (packs, ids) => {
    return ids.map((id) => {
      return packs.get(id)
    });
  }
);
