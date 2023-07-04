import { dataIndexSelector as dataIndexDataSelector } from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

export const dataIndexSelector = createSelector(
  dataIndexDataSelector,
  (index) =>
    [...index]
      .sort((a, b) => a.gameSystemName.localeCompare(b.gameSystemName))
      .map((i) => ({
        ...i,
        catalogues: [...i.catalogues].sort((a, b) =>
          a.catalogueName.localeCompare(b.catalogueName)
        ),
      }))
);
