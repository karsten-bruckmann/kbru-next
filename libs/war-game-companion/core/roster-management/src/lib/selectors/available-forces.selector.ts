import {
  cataloguesSelector,
  gameSystemsSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

import { NamedReference } from '../models/named-reference.model';

export const availableForcesSelector = (
  gameSystemId: string,
  catalogueId: string
) =>
  createSelector(
    gameSystemsSelector,
    cataloguesSelector,
    (gameSystems, catalogues): NamedReference[] =>
      [
        ...(gameSystems[gameSystemId]?.forceEntries.forceEntry || []),
        ...(catalogues[catalogueId]?.forceEntries?.forceEntry || []),
      ].map((force) => ({
        id: force['@_id'],
        name: force['@_name'],
      }))
  );
