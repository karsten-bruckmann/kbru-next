import { createSelector } from '@ngrx/store';

import { SkatGame } from '../schemas/skat-game.schema';
import { skatGamesSelector } from './skat-games.selector';

export const skatGameSelector = (gameId: string) =>
  createSelector(
    skatGamesSelector,
    (state): SkatGame | null => state[gameId] || null
  );
