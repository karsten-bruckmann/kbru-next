import {
  AddOn,
  skatListsSelector,
  SkatListsState,
} from '@kbru/skat-list/data-access/skat-lists';
import { createSelector } from '@ngrx/store';

import { Game } from '../models/game.model';
import { List } from '../models/list.model';
import { Player } from '../models/player.model';
import { getInitialStatus } from '../rules/get-initial-status.rule';
import { getStatus } from '../rules/get-status.rule';
import { gamesSelector } from './games.selector';
import { playersSelector } from './players.selector';

export const listSelector = (listId: string) =>
  createSelector<object, SkatListsState, Player[], Game[], List | null>(
    skatListsSelector,
    playersSelector(listId),
    gamesSelector(listId),
    (lists, players, games): List | null => {
      const status =
        lists[listId] && lists[listId].status ? lists[listId].status : null;
      return lists[listId]
        ? {
            id: listId,
            description:
              lists[listId].rules.addOn !== AddOn.None
                ? `${lists[listId].rules.addOn}`
                : lists[listId].rules.calculationType,
            players: players,
            games: games,
            status: status
              ? getStatus(status)
              : getInitialStatus(lists[listId]),
          }
        : null;
    }
  );
