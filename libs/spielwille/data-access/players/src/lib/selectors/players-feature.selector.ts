import { createFeatureSelector } from '@ngrx/store';

import { PlayersState } from '../schemas/players-state.schema';

export const playersFeatureSelector =
  createFeatureSelector<PlayersState>('players');
