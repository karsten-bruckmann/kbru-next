import {
  skatGamesSelector,
  SkatGamesState,
} from '@kbru/spielwille/data-access/skat-games';
import {
  skatListsSelector,
  SkatListsState,
} from '@kbru/spielwille/data-access/skat-lists';
import { createSelector } from '@ngrx/store';

import { Game } from '../models/game.model';
import { getGameFromData } from '../rules/get-game-from-data.rule';

export const listGamesSelector = (listId: string) =>
  createSelector<object, SkatListsState, SkatGamesState, Game[]>(
    skatListsSelector,
    skatGamesSelector,
    (lists, games): Game[] => {
      return (
        lists[listId]
          ? lists[listId].gameIds.map((id) => getGameFromData(games[id]))
          : []
      ).filter((game): game is Game => !!game);
    }
  );
