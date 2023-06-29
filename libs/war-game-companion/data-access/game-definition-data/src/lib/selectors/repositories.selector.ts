import { createFeatureSelector } from '@ngrx/store';

import { gameDefinitionDataSlice } from '../game-definition-data.slice';

export const repositoriesSelector = createFeatureSelector<string[]>(
  `${gameDefinitionDataSlice}/repositories`
);
