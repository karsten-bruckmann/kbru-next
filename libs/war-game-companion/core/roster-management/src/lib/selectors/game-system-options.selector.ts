import { gameSystemsSelector } from '@kbru/war-game-companion/data-access/game-definition-data';
import { createSelector } from '@ngrx/store';

export const gameSystemOptions = createSelector(
  gameSystemsSelector,
  (gameSystems): { name: string; id: string }[] =>
    Object.values(gameSystems).map((system) => ({
      name: system['@_name'],
      id: system['@_id'],
    }))
);
