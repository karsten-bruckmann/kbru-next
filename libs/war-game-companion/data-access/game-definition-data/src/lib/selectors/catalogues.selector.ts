import { createSelector } from '@ngrx/store';

import { Catalogue } from '../schemas/catalogue.schema';
import { gameDefinitionDataFeatureSelector } from './game-definition-data-feature.selector';

export const cataloguesSelector = createSelector(
  gameDefinitionDataFeatureSelector,
  (state): Record<string, Catalogue['catalogue']> => state.catalogues
);
