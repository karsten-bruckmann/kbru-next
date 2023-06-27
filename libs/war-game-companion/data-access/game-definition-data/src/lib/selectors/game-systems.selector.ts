import { createSelector } from '@ngrx/store';

import { GameSystemSchema } from '../schemas/game-system.schema';
import { gameDefinitionDataFeatureSelector } from './game-definition-data-feature.selector';

export const gameSystemsSelector = createSelector(
  gameDefinitionDataFeatureSelector,
  (state): Record<string, GameSystemSchema['gameSystem']> => state.gameSystems
);
