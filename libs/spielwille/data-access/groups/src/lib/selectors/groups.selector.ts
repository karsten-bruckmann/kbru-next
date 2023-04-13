import { createSelector } from '@ngrx/store';

import { groupsFeatureSelector } from './groups-feature.selector';

export const groupsSelector = createSelector(
  groupsFeatureSelector,
  (state) => state
);
