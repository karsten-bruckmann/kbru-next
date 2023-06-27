import { createSelector } from '@ngrx/store';

import { Catalogue } from '../schemas/catalogue.schema';
import { cataloguesSelector } from './catalogues.selector';

export const catalogueSelector = (id: string) =>
  createSelector(
    cataloguesSelector,
    (catalogues): Catalogue['catalogue'] | null => catalogues[id] ?? null
  );
