import { createSelector } from '@ngrx/store';

import { GameSystem } from '../models/game-system.model';
import { gameDefinitionDataSelector } from './game-definition-data.selector';

export const gameSystemSelector = createSelector(
  gameDefinitionDataSelector,
  (state): GameSystem | undefined => state && state.gameSystem
);
