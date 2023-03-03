import { createSelector } from '@ngrx/store';

import { rostersFeatureSelector } from './rosters-feature.selector';

export const rostersSelector = createSelector(
  rostersFeatureSelector,
  (state) => state.rosters
);
