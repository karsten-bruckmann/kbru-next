import { skatListsSelector } from '@kbru/skat-list/data-access/skat-lists';
import { createSelector } from '@ngrx/store';
import { parseISO } from 'date-fns';

import { List } from '../models/list.model';
import { groupSelector } from './group.selector';

export const listsSelector = (groupId: string) =>
  createSelector(
    groupSelector(groupId),
    skatListsSelector,
    (group, lists): List[] =>
      group
        ? group.listIds.map((id) => ({
            id,
            summary: lists[id].rules.addOn
              ? `${lists[id].rules.addOn}`
              : lists[id].rules.calculationType,
            lastUpdate: parseISO(lists[id].created),
          }))
        : []
  );
