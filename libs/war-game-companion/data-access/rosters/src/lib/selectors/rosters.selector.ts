import { createSelector } from '@ngrx/store';

import { Roster } from '../models/roster.model';
import { rostersFeatureSelector } from './rosters-feature.selector';

export const rostersSelector = createSelector(
  rostersFeatureSelector,
  (state): Roster[] => state
);
