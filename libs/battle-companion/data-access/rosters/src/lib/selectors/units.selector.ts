import { createSelector } from '@ngrx/store';

import { rostersFeatureSelector } from './rosters-feature.selector';

export const unitsSelector = createSelector(
  rostersFeatureSelector,
  (state) => state.units
);
