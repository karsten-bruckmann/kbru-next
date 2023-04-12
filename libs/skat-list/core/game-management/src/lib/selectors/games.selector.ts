import {
  playersSelector,
  PlayersState,
} from '@kbru/skat-list/data-access/players';
import {
  skatGamesSelector,
  SkatGamesState,
} from '@kbru/skat-list/data-access/skat-games';
import {
  skatListsSelector,
  SkatListsState,
} from '@kbru/skat-list/data-access/skat-lists';
import { createSelector } from '@ngrx/store';

import { Game } from '../models/game.model';

export const gamesSelector = (listId: string) =>
  createSelector<object, SkatListsState, SkatGamesState, PlayersState, Game[]>(
    skatListsSelector,
    skatGamesSelector,
    playersSelector,
    (lists, games, players): Game[] =>
      lists[listId]
        ? lists[listId].gameIds.map((id) => ({
            id,
            player: {
              id: games[id].playerId,
              name: players[games[id].playerId].name,
            },
          }))
        : []
  );
