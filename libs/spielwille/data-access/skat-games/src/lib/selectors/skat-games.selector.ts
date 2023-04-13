import { createSelector } from '@ngrx/store';

import { skatGamesFeatureSelector } from './skat-games-feature.selector';

export const skatGamesSelector = createSelector(
  skatGamesFeatureSelector,
  (state) => state
);
