import { createAction, props } from '@ngrx/store';

import { gameDefinitionDataSlice } from '../game-definition-data.slice';

export const catalogueOpenedAction = createAction(
  `${gameDefinitionDataSlice}/catalogue-opened`,
  props<{ catalogueId: string }>()
);
