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
import { gameSchema } from '../schemas/game.schema';

export const gamesSelector = (listId: string) =>
  createSelector<object, SkatListsState, SkatGamesState, Game[]>(
    skatListsSelector,
    skatGamesSelector,
    (lists, games): Game[] => {
      return (
        lists[listId]
          ? lists[listId].gameIds.map((id) =>
              gameSchema.parse({ id, ...games[id] })
            )
          : []
      ).filter((game): game is Game => !!game);
    }
  );
