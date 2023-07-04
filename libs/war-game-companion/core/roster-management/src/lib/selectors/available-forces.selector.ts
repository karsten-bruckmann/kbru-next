import {
  catalogueSelector,
  gameSystemSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

import { NamedReference } from '../models/named-reference.model';

export const availableForcesSelector = createSelector(
  gameSystemSelector,
  catalogueSelector,
  (gameSystem, catalogue): NamedReference[] =>
    [
      ...((gameSystem && gameSystem.forceEntries.forceEntry) ?? []),
      ...((catalogue && catalogue.forceEntries?.forceEntry) ?? []),
    ].map((force) => ({
      id: force['@_id'],
      name: force['@_name'],
    }))
);
