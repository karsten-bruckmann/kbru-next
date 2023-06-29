import {
  cataloguesSelector,
  gameSystemSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

import { NamedReference } from '../models/named-reference.model';

export const availableForcesSelector = (catalogueId: string) =>
  createSelector(
    gameSystemSelector,
    cataloguesSelector,
    (gameSystem, catalogues): NamedReference[] =>
      [
        ...((gameSystem && gameSystem.forceEntries.forceEntry) ?? []),
        ...((catalogues && catalogues[catalogueId]?.forceEntries?.forceEntry) ??
          []),
      ].map((force) => ({
        id: force['@_id'],
        name: force['@_name'],
      }))
  );
