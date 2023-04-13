import { createFeatureSelector } from '@ngrx/store';

import { SkatGamesState } from '../schemas/skat-games-state.schema';

export const skatGamesFeatureSelector =
  createFeatureSelector<SkatGamesState>('skat-games');
