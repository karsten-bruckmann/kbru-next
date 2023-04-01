import { createSelector } from '@ngrx/store';

import { playersFeatureSelector } from './players-feature.selector';

export const playersSelector = createSelector(
  playersFeatureSelector,
  (state) => state
);
