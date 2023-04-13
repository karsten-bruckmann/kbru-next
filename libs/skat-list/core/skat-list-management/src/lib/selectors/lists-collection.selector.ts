import { groupSelector } from '@kbru/skat-list/data-access/groups';
import { skatListsSelector } from '@kbru/skat-list/data-access/skat-lists';
import { createSelector } from '@ngrx/store';
import { parseISO } from 'date-fns';

import { ListCollectionItem } from '../models/list-collection-item.model';
import { groupPlayersSelector } from './group-players.selector';

export const listsCollectionSelector = (groupId: string) =>
  createSelector(
    groupSelector(groupId),
    skatListsSelector,
    groupPlayersSelector(groupId),
    (group, lists, players): ListCollectionItem[] =>
      group
        ? group.listIds.map((id) => {
            return {
              id,
              summary:
                lists[id].rules.addOn !== null
                  ? `${lists[id].rules.addOn}`
                  : lists[id].rules.calculationType,
              lastUpdate: parseISO(lists[id].created),
              playerNames: lists[id].playerIds
                .map(
                  (playerId) =>
                    players.find((player) => player.id === playerId)?.name
                )
                .filter((p): p is string => !!p),
            };
          })
        : []
  );
