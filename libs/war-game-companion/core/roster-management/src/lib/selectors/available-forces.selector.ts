import { Force } from '@kbru/war-game-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

import { definitionDataSelector } from './definition-data.selector';

export const availableForcesSelector = createSelector(
  definitionDataSelector,
  (data): Force[] =>
    (data?.forceEntries || []).map((force) => ({
      id: force.id,
      selections: {},
    }))
);
