import {
  Roster,
  rosterSelector as rosterDataSelector,
} from '@kbru/war-game-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

import { definitionDataSelector } from './definition-data.selector';

export const rosterSelector = (rosterId: string) =>
  createSelector(
    rosterDataSelector(rosterId),
    definitionDataSelector,
    (roster, data): Roster | null => {
      if (!data) {
        return null;
      }
      return roster || null;
    }
  );
