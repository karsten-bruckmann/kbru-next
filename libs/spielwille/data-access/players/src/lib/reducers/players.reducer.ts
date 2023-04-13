import { createReducer } from '@ngrx/store';

import { PlayersState } from '../schemas/players-state.schema';
import { playersInitialState } from '../players.initial-state';

export const playersReducer = createReducer<PlayersState>(playersInitialState);
