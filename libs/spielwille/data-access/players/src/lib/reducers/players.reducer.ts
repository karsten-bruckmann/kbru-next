import { createReducer } from '@ngrx/store';

import { playersInitialState } from '../players.initial-state';
import { PlayersState } from '../schemas/players-state.schema';

export const playersReducer = createReducer<PlayersState>(playersInitialState);
