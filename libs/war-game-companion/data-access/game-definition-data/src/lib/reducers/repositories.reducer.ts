import { createReducer, on } from '@ngrx/store';

import { gameDefinitionDataLoaded } from '../actions/game-definition-data-loaded.action';

export const repositoriesReducer = createReducer<string[]>(
  [],
  on(gameDefinitionDataLoaded, (state, action) => [
    ...state.filter(
      (repo) => repo !== action.gameDefinitionData.repositoryName
    ),
    action.gameDefinitionData.repositoryName,
  ])
);
