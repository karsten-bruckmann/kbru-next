import { groupSelector, Standard } from '@kbru/spielwille/data-access/groups';
import { createSelector } from '@ngrx/store';

export const listStandardSelector = (groupId: string, name: string) =>
  createSelector(
    groupSelector(groupId),
    (group): Standard | null => group?.standards[name] || null
  );
