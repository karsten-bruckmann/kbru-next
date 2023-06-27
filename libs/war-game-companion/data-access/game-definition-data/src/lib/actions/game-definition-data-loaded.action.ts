import { createAction, props } from '@ngrx/store';

import { GameDefinitionDataResponse } from '../api-clients/game-definition-data.api-client';
import { gameDefinitionDataSlice } from '../game-definition-data.slice';

export const gameDefinitionDataLoaded = createAction(
  `${gameDefinitionDataSlice}/loaded`,
  props<{ gameDefinitionData: GameDefinitionDataResponse }>()
);
