import { createAction, props } from '@ngrx/store';

import { gameDefinitionDataSlice } from '../game-definition-data.slice';

export const repositoryOpenedAction = createAction(
  `${gameDefinitionDataSlice}/repository-opened`,
  props<{ repositoryName: string }>()
);
