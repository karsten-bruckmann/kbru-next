import { createSelector } from '@ngrx/store';

import { Roster } from '../models/roster.model';
import { rostersSelector } from './rosters.selector';

export const rosterSelector = (repositoryName: string, id: string) =>
  createSelector(
    rostersSelector(repositoryName),
    (rosters): Roster | null =>
      rosters.find((roster) => roster.id === id) ?? null
  );
