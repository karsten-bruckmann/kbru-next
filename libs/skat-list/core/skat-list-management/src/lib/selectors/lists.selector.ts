import {
  AddOn,
  skatListsSelector,
} from '@kbru/skat-list/data-access/skat-lists';
import { createSelector } from '@ngrx/store';
import { parseISO } from 'date-fns';

import { List } from '../models/list.model';
import { Player } from '../models/player.model';
import { groupSelector } from './group.selector';
import { playersSelector } from './players.selector';

export const listsSelector = (groupId: string) =>
  createSelector(
    groupSelector(groupId),
    skatListsSelector,
    playersSelector(groupId),
    (group, lists, players): List[] =>
      group
        ? group.listIds.map((id) => {
            return {
              id,
              summary:
                lists[id].rules.addOn !== AddOn.None
                  ? `${lists[id].rules.addOn}`
                  : lists[id].rules.calculationType,
              lastUpdate: parseISO(lists[id].created),
              players: lists[id].playerIds
                .map((playerId) =>
                  players.find((player) => player.id === playerId)
                )
                .filter<Player>((p): p is Player => !!p),
            };
          })
        : []
  );
