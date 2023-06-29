import { cataloguesSelector } from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

import { NamedReference } from '../models/named-reference.model';

export const availableCataloguesSelector = createSelector(
  cataloguesSelector,
  (catalogues): NamedReference[] => {
    return Object.values(catalogues ?? {}).map((c) => {
      return {
        id: c['@_id'],
        name: c['@_name'],
      };
    });
  }
);
