import { createSelector } from '@ngrx/store';

import { SkatGame } from '../models/skat-game.model';
import { skatGamesSelector } from './skat-games.selector';

export const skatGameSelector = (gameId: string) =>
  createSelector(
    skatGamesSelector,
    (state): SkatGame | null => state[gameId] || null
  );
