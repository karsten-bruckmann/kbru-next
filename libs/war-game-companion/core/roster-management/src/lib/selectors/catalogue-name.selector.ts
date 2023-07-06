import { createSelector } from '@ngrx/store';

import { definitionDataSelector } from './definition-data.selector';

export const catalogueNameSelector = createSelector(
  definitionDataSelector,
  (data) => data?.catalogue.name
);
