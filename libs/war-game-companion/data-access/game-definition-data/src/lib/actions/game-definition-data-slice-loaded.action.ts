import { createAction } from '@ngrx/store';

import { gameDefinitionDataSlice } from '../game-definition-data.slice';

export const gameDefinitionDataSliceLoaded = createAction(
  `${gameDefinitionDataSlice}/slice-loaded`
);
