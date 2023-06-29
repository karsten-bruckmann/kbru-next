import { createSelector } from '@ngrx/store';

import { CatalogueSchema } from '../schemas/catalogue.schema';
import { cataloguesSelector } from './catalogues.selector';

export const catalogueSelector = (id: string) =>
  createSelector(
    cataloguesSelector,
    (catalogues): CatalogueSchema['catalogue'] | undefined =>
      catalogues && catalogues[id]
  );
