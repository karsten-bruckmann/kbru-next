import {
  GameDefinitionDataState,
  gameSystemsSelector,
} from '@kbru/war-game-companion/data-access/game-definition-data';
import {
  rostersSelector,
  RostersState,
} from '@kbru/war-game-companion/data-access/rosters';
import { createSelector } from '@ngrx/store';

import { NamedReference } from '../models/named-reference.model';

export const rosterListSelector = createSelector(
  rostersSelector,
  gameSystemsSelector,
  (
    rosters: RostersState,
    gameSystems: GameDefinitionDataState['gameSystems']
  ): {
    gameSystemName: string;
    rosters: NamedReference[];
  }[] =>
    Object.values(gameSystems)
      .map((system) => ({
        gameSystemName: system['@_name'],
        rosters: rosters.map((roster) => ({
          name: roster.name,
          id: roster.id,
        })),
      }))
      .filter((sys) => sys.rosters.length > 0)
);
