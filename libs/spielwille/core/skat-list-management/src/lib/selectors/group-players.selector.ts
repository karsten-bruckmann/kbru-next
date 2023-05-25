import { groupSelector } from '@kbru/spielwille/data-access/groups';
import { playersSelector } from '@kbru/spielwille/data-access/players';
import { createSelector } from '@ngrx/store';

import { Player } from '../models/player.model';

export const groupPlayersSelector = (groupId: string) =>
  createSelector(
    groupSelector(groupId),
    playersSelector,
    (group, players): Player[] =>
      group
        ? group.playerIds.map((id) => ({
            id,
            name: players[id].name,
          }))
        : []
  );
