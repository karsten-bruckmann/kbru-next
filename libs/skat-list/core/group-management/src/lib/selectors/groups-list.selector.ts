import { groupsSelector } from '@kbru/skat-list/data-access/groups';
import { createSelector } from '@ngrx/store';

import { GroupsListItem } from '../models/groups-list.item.model';

export const groupsListSelector = createSelector(
  groupsSelector,
  (groups): GroupsListItem[] =>
    Object.keys(groups).map((id) => ({
      id,
      name: groups[id].name,
    }))
);
