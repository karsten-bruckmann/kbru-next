import { createSelector } from '@ngrx/store';

import { Catalogue } from '../models/catalogue.model';
import { gameDefinitionDataSelector } from './game-definition-data.selector';

export const catalogueSelector = createSelector(
  gameDefinitionDataSelector,
  (state): Catalogue | undefined => state?.catalogue
);
