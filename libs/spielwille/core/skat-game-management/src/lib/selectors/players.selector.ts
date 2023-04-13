import { playersSelector as basePlayersSelector } from '@kbru/spielwille/data-access/players';
import { skatListsSelector } from '@kbru/spielwille/data-access/skat-lists';
import { createSelector } from '@ngrx/store';

import { Player } from '../models/player.model';

export const playersSelector = (listId: string) =>
  createSelector(
    skatListsSelector,
    basePlayersSelector,
    (lists, players): Player[] =>
      lists[listId]
        ? lists[listId].playerIds.map((id: string) => ({
            id,
            name: players[id].name,
          }))
        : []
  );
