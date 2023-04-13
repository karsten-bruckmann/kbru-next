import { createFeatureSelector } from '@ngrx/store';

import { SkatGamesState } from '../models/skat-games-state.model';

export const skatGamesFeatureSelector =
  createFeatureSelector<SkatGamesState>('skat-games');
