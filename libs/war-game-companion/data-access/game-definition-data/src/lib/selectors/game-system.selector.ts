import { createSelector } from '@ngrx/store';

import { GameSystemSchema } from '../schemas/game-system.schema';
import { gameDefinitionDataFeatureSelector } from './game-definition-data-feature.selector';

export const gameSystemSelector = (id: string) =>
  createSelector(
    gameDefinitionDataFeatureSelector,
    (state): GameSystemSchema['gameSystem'] | null =>
      state.gameSystems[id] ?? null
  );
