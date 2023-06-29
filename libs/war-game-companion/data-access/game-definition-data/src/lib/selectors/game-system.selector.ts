import { createSelector } from '@ngrx/store';

import { GameSystemSchema } from '../schemas/game-system.schema';
import { gameDefinitionDataSelector } from './game-definition-data.selector';

export const gameSystemSelector = createSelector(
  gameDefinitionDataSelector,
  (state): GameSystemSchema['gameSystem'] | undefined =>
    state && state.gameSystem
);
