import { createAction, props } from '@ngrx/store';

import { gameDefinitionDataSlice } from '../game-definition-data.slice';
import { DataIndex } from '../models/data-index.model';

export const gameDefinitionDatapersisted = createAction(
  `${gameDefinitionDataSlice}/persisted`,
  props<{
    data: DataIndex;
  }>()
);
