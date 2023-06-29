import { createFeatureSelector } from '@ngrx/store';

import { gameDefinitionDataSlice } from '../game-definition-data.slice';
import { GameDefinitionDataState } from '../models/game-definition-data-state.model';

export const gameDefinitionDataSelector = createFeatureSelector<
  GameDefinitionDataState | undefined
>(gameDefinitionDataSlice);
