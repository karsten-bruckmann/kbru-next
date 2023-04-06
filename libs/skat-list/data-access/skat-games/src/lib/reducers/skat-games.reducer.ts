import { createReducer } from '@ngrx/store';

import { SkatGamesState } from '../models/skat-games-state.model';
import { skatGamesInitialState } from '../skat-games.initial-state';

export const skatGamesReducer = createReducer<SkatGamesState>(
  skatGamesInitialState
);
