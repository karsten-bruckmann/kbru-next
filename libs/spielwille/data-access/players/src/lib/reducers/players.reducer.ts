import { createReducer } from '@ngrx/store';

import { PlayersState } from '../models/players-state.model';
import { playersInitialState } from '../players.initial-state';

export const playersReducer = createReducer<PlayersState>(playersInitialState);
