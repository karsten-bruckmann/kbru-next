import { gameSystemsSelector } from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

import { NamedReference } from '../models/named-reference.model';

export const availableGameSystemsSelector = createSelector(
  gameSystemsSelector,
  (gameSystems): NamedReference[] =>
    Object.values(gameSystems).map((system) => ({
      name: system['@_name'],
      id: system['@_id'],
    }))
);
