import {
  cataloguesSelector,
  gameSystemsSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

import { GameSystemListItem } from '../models/game-system-list.item';

export const gameSystemListItemsSelector = createSelector(
  gameSystemsSelector,
  cataloguesSelector,
  (gameSystems, catalogues): GameSystemListItem[] =>
    Object.values(gameSystems)
      .map((gameSystem) => ({
        id: gameSystem['@_id'],
        name: gameSystem['@_name'],
        catalogues: Object.values(catalogues)
          .filter((cat) => cat['@_gameSystemId'] === gameSystem['@_id'])
          .map((cat) => cat['@_name'])
          .sort((a, b) => a.localeCompare(b)),
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
);
