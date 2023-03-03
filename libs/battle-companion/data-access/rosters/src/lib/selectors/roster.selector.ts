import { createSelector } from '@ngrx/store';

import { rostersSelector } from './rosters.selector';

export const rosterSelector = (id: string) =>
  createSelector(rostersSelector, (rosters) => rosters[id]);
