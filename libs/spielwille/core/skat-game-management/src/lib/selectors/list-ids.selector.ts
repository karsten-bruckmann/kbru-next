import { skatListsSelector } from '@kbru/spielwille/data-access/skat-lists';
import { createSelector } from '@ngrx/store';

export const listIdsSelector = createSelector(
  skatListsSelector,
  (lists): string[] => Object.keys(lists)
);
