import {
  skatListsSelector,
  SkatListsState,
} from '@kbru/spielwille/data-access/skat-lists';
import { createSelector } from '@ngrx/store';

import { getInitialStatus } from '../rules/get-initial-status.rule';
import { Game } from '../schemas/game.schema';
import { List, listSchema } from '../schemas/list.schema';
import { listGamesSelector } from './list-games.selector';
import { listPlayersSelector } from './list-players.selector';

export const listSelector = (listId: string) =>
  createSelector<object, SkatListsState, string[], Game[], List | null>(
    skatListsSelector,
    listPlayersSelector(listId),
    listGamesSelector(listId),
    (lists, players, games): List | null => {
      const list = lists[listId];
      return list
        ? listSchema.parse({
            id: listId,
            description:
              list.rules.addOn !== null
                ? `${list.rules.addOn}`
                : list.rules.calculationType,
            playerNames: players,
            games,
            ...list,
            status: list.status ?? getInitialStatus(list),
          })
        : null;
    }
  );
