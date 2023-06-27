import { createSelector } from '@ngrx/store';

import { GameSystem } from '../schemas/game-system.schema';
import { gameDefinitionDataFeatureSelector } from './game-definition-data-feature.selector';

export const gameSystemsSelector = createSelector(
  gameDefinitionDataFeatureSelector,
  (state): Record<string, GameSystem['gameSystem']> => state.gameSystems
);
