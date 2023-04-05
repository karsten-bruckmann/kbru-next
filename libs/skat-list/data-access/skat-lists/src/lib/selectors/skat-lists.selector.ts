import { createSelector } from '@ngrx/store';

import { skatListsFeatureSelector } from './skat-lists-feature.selector';

export const skatListsSelector = createSelector(
  skatListsFeatureSelector,
  (state) => state
);
