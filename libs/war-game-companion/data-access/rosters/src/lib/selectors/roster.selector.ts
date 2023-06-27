import { createSelector } from '@ngrx/store';

import { Roster } from '../models/roster.model';
import { rostersSelector } from './rosters.selector';

export const rosterSelector = (id: string) =>
  createSelector(
    rostersSelector,
    (rosters): Roster | null =>
      rosters.find((roster) => roster.id === id) ?? null
  );
