import { createReducer, on } from '@ngrx/store';

import { gameDefinitionDataLoaded } from '../actions/game-definition-data-loaded.action';
import { gameDefinitionDataInitialState } from '../game-definition-data.initial-state';
import { GameDefinitionDataState } from '../models/game-definition-data-state.model';

export const gameDefinitionDataReducer = createReducer<GameDefinitionDataState>(
  gameDefinitionDataInitialState,
  on(
    gameDefinitionDataLoaded,
    (state, action): GameDefinitionDataState => ({
      gameSystems: {
        ...state.gameSystems,
        ...action.gameDefinitionData.gameSystems,
      },
      catalogues: {
        ...state.catalogues,
        ...action.gameDefinitionData.catalogues,
      },
    })
  )
);
