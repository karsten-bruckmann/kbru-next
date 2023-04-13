import {
  skatGamesSelector,
  SkatGamesState,
} from '@kbru/spielwille/data-access/skat-games';
import {
  skatListsSelector,
  SkatListsState,
} from '@kbru/spielwille/data-access/skat-lists';
import { createSelector } from '@ngrx/store';

import { Game, gameSchema } from '../schemas/game.schema';

export const listGamesSelector = (listId: string) =>
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
