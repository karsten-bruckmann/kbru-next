import { createSelector } from '@ngrx/store';

import { Group } from '../schemas/group.schema';
import { groupsSelector } from './groups.selector';

export const groupSelector = (id: string) =>
  createSelector(groupsSelector, (groups): Group | null => groups[id] || null);
