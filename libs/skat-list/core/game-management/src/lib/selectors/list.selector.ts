import { skatListsSelector } from '@kbru/skat-list/data-access/skat-lists';
import { createSelector } from '@ngrx/store';

import { List } from '../models/list.model';

export const listSelector = (listId: string) =>
  createSelector(skatListsSelector, (lists): List | null =>
    lists[listId]
      ? {
          id: listId,
          description: lists[listId].rules.addOn
            ? `${lists[listId].rules.addOn}`
            : lists[listId].rules.calculationType,
        }
      : null
  );
