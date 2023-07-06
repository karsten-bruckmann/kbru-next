import { createSelector } from '@ngrx/store';

import { definitionDataSelector } from './definition-data.selector';

export const gameSystemNameSelector = createSelector(
  definitionDataSelector,
  (data) => data?.gameSystem.name
);
