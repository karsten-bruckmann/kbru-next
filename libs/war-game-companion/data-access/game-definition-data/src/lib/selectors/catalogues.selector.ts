import { createSelector } from '@ngrx/store';

import { CatalogueSchema } from '../schemas/catalogue.schema';
import { gameDefinitionDataSelector } from './game-definition-data.selector';

export const cataloguesSelector = createSelector(
  gameDefinitionDataSelector,
  (state): Record<string, CatalogueSchema['catalogue']> | undefined => {
    return state?.catalogues;
  }
);
