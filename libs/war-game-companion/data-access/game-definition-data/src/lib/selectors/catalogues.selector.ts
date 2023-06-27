import { createSelector } from '@ngrx/store';

import { CatalogueSchema } from '../schemas/catalogue.schema';
import { gameDefinitionDataFeatureSelector } from './game-definition-data-feature.selector';

export const cataloguesSelector = createSelector(
  gameDefinitionDataFeatureSelector,
  (state): Record<string, CatalogueSchema['catalogue']> => state.catalogues
);
