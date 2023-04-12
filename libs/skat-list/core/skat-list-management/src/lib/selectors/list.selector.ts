import { toIdAware } from '@kbru/shared/utils/array-utils';
import { playersSelector } from '@kbru/skat-list/data-access/players';
import {
  AddOn,
  skatListsSelector,
} from '@kbru/skat-list/data-access/skat-lists';
import { createSelector } from '@ngrx/store';
import { parseISO } from 'date-fns';

import { List } from '../models/list.model';
import { Player } from '../models/player.model';

export const listSelector = (listId: string) =>
  createSelector(
    playersSelector,
    skatListsSelector,
    (players, lists): List => ({
      id: listId,
      summary:
        lists[listId].rules.addOn !== AddOn.None
          ? `${lists[listId].rules.addOn}`
          : lists[listId].rules.calculationType,
      lastUpdate: parseISO(lists[listId].created),
      players: lists[listId].playerIds
        .map((playerId) =>
          toIdAware(players).find((player) => player.id === playerId)
        )
        .filter<Player>((p): p is Player => !!p),
    })
  );
