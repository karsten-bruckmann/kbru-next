import { groupSelector } from '@kbru/spielwille/data-access/groups';
import { skatListsSelector } from '@kbru/spielwille/data-access/skat-lists';
import { createSelector } from '@ngrx/store';
import { parseISO } from 'date-fns';

import { ListCollectionItem } from '../models/list-collection-item.model';
import { getListPlayerNames } from '../rules/get-list-player-names.rule';
import { getListSummary } from '../rules/get-list-summary.rule';
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
              summary: getListSummary(lists[id]),
              lastUpdate: parseISO(lists[id].created),
              playerNames: getListPlayerNames(lists[id], players),
            };
          })
        : []
  );
