import { createAction, props } from '@ngrx/store';

import { gameDefinitionDataSlice } from '../game-definition-data.slice';
import { GameDefinitionDataState } from '../models/game-definition-data-state.model';

export const gameDefinitionDataLoaded = createAction(
  `${gameDefinitionDataSlice}/loaded`,
  props<{
    gameDefinitionData: GameDefinitionDataState;
  }>()
);
