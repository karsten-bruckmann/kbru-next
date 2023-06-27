import {
  cataloguesSelector,
  GameDefinitionDataState,
  gameSystemsSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import {
  rostersSelector,
  RostersState,
} from '@kbru/war-game-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

export const rosterListSelector = createSelector(
  rostersSelector,
  gameSystemsSelector,
  cataloguesSelector,
  (
    rosters: RostersState,
    gameSystems: GameDefinitionDataState['gameSystems'],
    catalogues: GameDefinitionDataState['catalogues']
  ): {
    gameSystemName: string;
    catalogues: {
      name: string;
      rosters: { name: string; id: string }[];
    }[];
  }[] =>
    Object.values(gameSystems)
      .map((system) => ({
        gameSystemName: system['@_name'],
        catalogues: Object.values(catalogues)
          .filter((cat) => cat['@_gameSystemId'] === system['@_id'])
          .map((cat) => ({
            name: cat['@_name'],
            rosters: rosters
              .filter((roster) => roster.catalogueId === cat['@_id'])
              .map((roster) => ({ name: roster.name, id: roster.id })),
          })),
      }))
      .map((sys) => ({
        ...sys,
        catalogues: sys.catalogues.filter((cat) => cat.rosters.length > 0),
      }))
      .filter((sys) => sys.catalogues.length > 0)
);
