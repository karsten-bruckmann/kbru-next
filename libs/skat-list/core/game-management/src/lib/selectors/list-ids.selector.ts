import { skatListsSelector } from '@kbru/skat-list/data-access/skat-lists';
import { createSelector } from '@ngrx/store';

export const listIdsSelector = createSelector(
  skatListsSelector,
  (lists): string[] => Object.keys(lists)
);
