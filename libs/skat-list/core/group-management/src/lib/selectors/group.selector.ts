import { groupsSelector } from '@kbru/skat-list/data-access/groups';
import { playersSelector } from '@kbru/skat-list/data-access/players';
import { createSelector } from '@ngrx/store';

import { Group } from '../models/group.model';

export const groupSelector = (groupId: string) =>
  createSelector(
    groupsSelector,
    playersSelector,
    (groups, players): Group | null =>
      groups[groupId]
        ? {
            id: groupId,
            name: groups[groupId].name,
            players: groups[groupId].playerIds.map((id) => ({
              id: id,
              name: players[id]?.name || 'Unbekannter Spieler',
            })),
          }
        : null
  );
