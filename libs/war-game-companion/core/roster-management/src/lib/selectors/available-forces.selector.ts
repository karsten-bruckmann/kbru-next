import { createSelector } from '@ngrx/store';

import { HydratedForce } from '../models/hydrated-force.model';
import { definitionDataSelector } from './definition-data.selector';

export const availableForcesSelector = createSelector(
  definitionDataSelector,
  (data): HydratedForce[] =>
    (data?.forceEntries || []).map((force) => ({
      id: force.id,
      name: force.name,
      selections: [],
    }))
);
