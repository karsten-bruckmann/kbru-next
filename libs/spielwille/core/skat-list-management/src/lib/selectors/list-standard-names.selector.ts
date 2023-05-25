import { groupSelector } from '@kbru/spielwille/data-access/groups';
import { createSelector } from '@ngrx/store';

export const listStandardNamesSelector = (groupId: string) =>
  createSelector(groupSelector(groupId), (group): string[] =>
    group ? Object.keys(group.standards) : []
  );
