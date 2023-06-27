import { cataloguesSelector } from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

export const catalogueOptions = (id: string) =>
  createSelector(
    cataloguesSelector,
    (catalogues): { name: string; id: string }[] =>
      Object.values(catalogues)
        .filter((cat) => cat['@_gameSystemId'] === id)
        .map((system) => ({
          name: system['@_name'],
          id: system['@_id'],
        }))
  );
