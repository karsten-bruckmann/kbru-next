import { createReducer } from '@ngrx/store';

import { SkatGamesState } from '../schemas/skat-games-state.schema';
import { skatGamesInitialState } from '../skat-games.initial-state';

export const skatGamesReducer = createReducer<SkatGamesState>(
  skatGamesInitialState
);
