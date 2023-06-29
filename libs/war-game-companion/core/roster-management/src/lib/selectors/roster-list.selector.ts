import {
  Roster,
  rostersSelector,
} from '@kbru/war-game-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

import { NamedReference } from '../models/named-reference.model';

export const rosterListSelector = (repositoryName: string) =>
  createSelector(
    rostersSelector(repositoryName),
    (rosters?: Roster[]): NamedReference[] =>
      (rosters ?? []).map((roster) => ({
        name: roster.name,
        id: roster.id,
      }))
  );
