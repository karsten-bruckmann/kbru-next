import {
  skatListsSelector,
  SkatListsState,
} from '@kbru/spielwille/data-access/skat-lists';
import { createSelector } from '@ngrx/store';

import { Game } from '../models/game.model';
import { List } from '../models/list.model';
import { getInitialStatus } from '../rules/get-initial-status.rule';
import { listStatusFromData } from '../rules/list-status-from-data.rule';
import { listGamesSelector } from './list-games.selector';
import { listPlayersSelector } from './list-players.selector';

export const listSelector = (listId: string) =>
  createSelector<object, SkatListsState, string[], Game[], List | null>(
    skatListsSelector,
    listPlayersSelector(listId),
    listGamesSelector(listId),
    (lists, players, games): List | null => {
      const list = lists[listId];

      if (!list) {
        return list;
      }

      const listWithoutStatus = {
        id: listId,
        description:
          list.rules.addOn !== null
            ? `${list.rules.addOn}`
            : list.rules.calculationType,
        playerNames: players,
        games,
        created: list.created,
        rules: list.rules,
      };

      return {
        ...listWithoutStatus,
        status: list.status
          ? listStatusFromData(list.status)
          : getInitialStatus(listWithoutStatus),
      };
    }
  );
