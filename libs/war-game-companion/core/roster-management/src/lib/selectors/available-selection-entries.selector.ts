import {
  catalogueSelector,
  gameSystemSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

import { NamedReference } from '../models/named-reference.model';

export const availableSelectionEntriesSelector = (
  catalogueId: string,
  categoryId: string
) =>
  createSelector(
    gameSystemSelector,
    catalogueSelector(catalogueId),
    (gameSystem, catalogue): NamedReference[] => {
      return (
        [
          ...(gameSystem?.entryLinks?.entryLink || []),
          ...(catalogue?.entryLinks?.entryLink || []),
        ]
          // .filter((el) => el['@_targetId'] === categoryId)
          .map((el) => {
            console.log({ name: el['@_name'], el, categoryId });
            return {
              id: el['@_id'],
              name: el['@_name'] || '__unknown__',
            };
          })
      );
    }
  );
