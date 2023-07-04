import { createSelector } from '@ngrx/store';

import { CatalogueSchema } from '../schemas/catalogue.schema';
import { gameDefinitionDataSelector } from './game-definition-data.selector';

export const catalogueSelector = createSelector(
  gameDefinitionDataSelector,
  (state): CatalogueSchema['catalogue'] | undefined => state?.catalogue
);
