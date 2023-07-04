import { rosterSelector as rosterDataSelector } from '@kbru/war-game-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

import { HydratedRoster } from '../models/hydrated-roster.model';
import { hydrateRoster } from '../rules/hydrate-roster.rule';
import { definitionDataSelector } from './definition-data.selector';

export const rosterSelector = (rosterId: string) =>
  createSelector(
    rosterDataSelector(rosterId),
    definitionDataSelector,
    (roster, data): HydratedRoster | null => {
      if (!data) {
        return null;
      }
      return roster ? hydrateRoster(roster, data) : null;
    }
  );
