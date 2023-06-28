import { cataloguesSelector } from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

import { NamedReference } from '../models/named-reference.model';

export const availableCataloguesSelector = (gameSystemId: string) =>
  createSelector(cataloguesSelector, (catalogues): NamedReference[] => {
    return Object.values(catalogues)
      .filter((c) => c['@_gameSystemId'] === gameSystemId)
      .map((c) => {
        return {
          id: c['@_id'],
          name: c['@_name'],
        };
      });
  });
