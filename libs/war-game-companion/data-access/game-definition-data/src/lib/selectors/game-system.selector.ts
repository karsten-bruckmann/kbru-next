import { createSelector } from '@ngrx/store';

import { GameSystem } from '../schemas/game-system.schema';
import { gameDefinitionDataFeatureSelector } from './game-definition-data-feature.selector';

export const gameSystemSelector = (id: string) =>
  createSelector(
    gameDefinitionDataFeatureSelector,
    (state): GameSystem['gameSystem'] | null => state.gameSystems[id] ?? null
  );
