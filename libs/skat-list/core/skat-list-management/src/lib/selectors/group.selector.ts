import { groupsSelector } from '@kbru/skat-list/data-access/groups';
import { createSelector } from '@ngrx/store';

import { Group } from '../models/group.model';

export const groupSelector = (groupId: string) =>
  createSelector(groupsSelector, (groups): Group | null =>
    groups[groupId]
      ? {
          id: groupId,
          playerIds: groups[groupId].playerIds,
          listIds: groups[groupId].listIds,
        }
      : null
  );
