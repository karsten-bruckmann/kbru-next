import { createSelector } from '@ngrx/store';

import { Roster } from '../models/roster.model';
import { rostersFeatureSelector } from './rosters-feature.selector';

export const rosterSelector = (rosterId: string) =>
  createSelector(rostersFeatureSelector, (state): Roster | undefined =>
    Object.values(state)
      .flat()
      .find((ros) => ros.id === rosterId)
  );
