import { createFeatureSelector } from '@ngrx/store';

import { PlayersState } from '../models/players-state.model';

export const playersFeatureSelector =
  createFeatureSelector<PlayersState>('players');
