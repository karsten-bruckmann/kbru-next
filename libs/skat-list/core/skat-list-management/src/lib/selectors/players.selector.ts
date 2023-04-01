import { playersSelector as basePlayersSelector } from '@kbru/skat-list/data-access/players';
import { createSelector } from '@ngrx/store';

import { Player } from '../models/player.model';
import { groupSelector } from './group.selector';

export const playersSelector = (groupId: string) =>
  createSelector(
    groupSelector(groupId),
    basePlayersSelector,
    (group, players): Player[] =>
      group
        ? group.playerIds.map((id) => ({
            id,
            name: players[id].name,
          }))
        : []
  );
